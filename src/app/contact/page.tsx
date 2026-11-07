import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact OmniTech | Technical Services & Support",
  description:
    "Direct contact for custom software development, IT helpdesk, application incident management, and data analytics consulting in South Africa.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24">
      <Container size="default">
        <ContactForm />
      </Container>
    </div>
  );
}
