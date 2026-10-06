import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid form data provided.",
          issues: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Honeypot check
    if (data.website && data.website.length > 0) {
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // 3. Provider-Agnostic Email Dispatch
    // Check if provider credentials (e.g. Resend, Sendgrid, SMTP) are present
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "hello@omnitech.dev";

    if (resendApiKey) {
      try {
        // Send email via Resend API
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "OmniTech Contact <inquiries@omnitech.dev>",
            to: recipientEmail,
            reply_to: data.email,
            subject: `[OmniTech Project Inquiry] - ${data.projectType} from ${data.name}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "N/A"}
Project Type: ${data.projectType}
Budget: ${data.budgetRange || "Flexible"}

Message:
${data.message}
            `,
          }),
        });

        if (!emailRes.ok) {
          console.error("Resend API failed:", await emailRes.text());
        }
      } catch (emailErr) {
        console.error("Failed to send email via configured provider:", emailErr);
      }
    } else {
      // In development or when credentials are not yet supplied, log the payload safely
      console.log("------------------------------------------");
      console.log("[OmniTech DEV Contact Submission]");
      console.log(`From: ${data.name} <${data.email}>`);
      console.log(`Company: ${data.company || "None"}`);
      console.log(`Type: ${data.projectType} | Budget: ${data.budgetRange || "Flexible"}`);
      console.log(`Message: ${data.message}`);
      console.log("------------------------------------------");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully received. We will be in touch shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
