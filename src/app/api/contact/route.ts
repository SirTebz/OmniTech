import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { siteConfig } from "@/data/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid enquiry data provided.",
          issues: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Honeypot anti-spam check
    if (data.website && data.website.length > 0) {
      return NextResponse.json(
        { success: true, message: "Enquiry received successfully." },
        { status: 200 }
      );
    }

    // 3. Email Dispatch via Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || siteConfig.email;

    if (resendApiKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || `OmniTech Inquiries <inquiries@omnitech.dev>`,
            to: recipientEmail,
            reply_to: data.email,
            subject: `[OmniTech Enquiry] ${data.service}: ${data.subject}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Service Required: ${data.service}
Preferred Contact: ${data.preferredContact}
Subject: ${data.subject}

Message:
${data.message}
            `,
          }),
        });

        if (!emailRes.ok) {
          console.error("Resend API responded with error:", await emailRes.text());
        }
      } catch (emailErr) {
        console.error("Failed to deliver email through Resend API:", emailErr);
      }
    } else {
      // Development or test fallback logging
      console.log("------------------------------------------");
      console.log("[OmniTech Contact Form Fallback Logging]");
      console.log(`To: ${recipientEmail}`);
      console.log(`From: ${data.name} (${data.email})`);
      console.log(`Phone: ${data.phone || "N/A"}`);
      console.log(`Service: ${data.service}`);
      console.log(`Subject: ${data.subject}`);
      console.log(`Message: ${data.message}`);
      console.log("------------------------------------------");
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out! Your message has been received and I will respond to your enquiry promptly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred while processing your enquiry. Please reach out directly via email.",
      },
      { status: 500 }
    );
  }
}
