import { z } from "zod";

export const contactServiceOptions = [
  "Software Development",
  "Web Development",
  "IT Support & Helpdesk",
  "Application Support",
  "Data Analytics & BI",
  "Website Maintenance",
  "UI/UX Design",
  "Technical Consulting",
  "Other",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  phone: z
    .string()
    .max(30, { message: "Phone number is too long." })
    .optional()
    .or(z.literal("")),
  service: z.enum(contactServiceOptions, {
    errorMap: () => ({ message: "Please select a valid service area." }),
  }),
  preferredContact: z.enum(["Email", "Phone", "Either"]),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." })
    .max(150, { message: "Subject is too long." }),
  message: z
    .string()
    .min(10, { message: "Please provide at least 10 characters describing your request." })
    .max(3000, { message: "Message is too long (maximum 3000 characters)." }),
  website: z.string().max(0, { message: "Spam detected." }).optional().or(z.literal("")), // Honeypot
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
