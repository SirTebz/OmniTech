import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  company: z
    .string()
    .max(100, { message: "Company name is too long." })
    .optional()
    .or(z.literal("")),
  projectType: z.enum(
    [
      "Website",
      "Web Application",
      "Custom Software",
      "Website Improvement",
      "Technical Support",
      "Other",
    ],
    {
      errorMap: () => ({ message: "Please select a valid project type." }),
    }
  ),
  budgetRange: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .min(10, { message: "Message should contain at least 10 characters." })
    .max(2000, { message: "Message is too long (max 2000 chars)." }),
  website: z.string().max(0, { message: "Spam detected." }).optional().or(z.literal("")), // Honeypot
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
