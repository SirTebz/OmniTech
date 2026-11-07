"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormData,
  contactServiceOptions,
} from "@/lib/validations/contact";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: "Software Development",
      preferredContact: "Email",
      website: "", // honeypot
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resJson = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        setServerMessage(resJson.message || "Enquiry sent successfully!");
        reset();
      } else {
        setSubmissionStatus("error");
        setServerMessage(resJson.error || "Failed to submit enquiry. Please try again.");
      }
    } catch {
      setSubmissionStatus("error");
      setServerMessage("Network error occurred. Please contact directly via email.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Direct Contact Details & Context */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Client & Business Support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
            Let&apos;s Build, Support, or Troubleshoot Together
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you need custom software engineered, IT helpdesk troubleshooting, production application support, or data analytics reporting, I provide direct, accountable technical services.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="space-y-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-muted-foreground uppercase text-[10px] mb-0.5">Email Address</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-bold text-foreground hover:text-blue-500 hover:underline"
              >
                {siteConfig.email}
              </a>
              <span className="block text-muted-foreground text-[11px] mt-0.5">Direct project inquiries & support requests</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-muted-foreground uppercase text-[10px] mb-0.5">Location & Operations</span>
              <span className="text-sm font-bold text-foreground block">
                {siteConfig.location}
              </span>
              <span className="block text-muted-foreground text-[11px] mt-0.5">Available for remote & hybrid engagements</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-muted-foreground uppercase text-[10px] mb-0.5">Support Availability</span>
              <span className="text-sm font-bold text-foreground block">
                {siteConfig.workingHours}
              </span>
              <span className="block text-muted-foreground text-[11px] mt-0.5">Rapid turnaround for high-priority support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm">
        {submissionStatus === "success" ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Message Received!</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {serverMessage}
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmissionStatus("idle")}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs font-mono"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {submissionStatus === "error" && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverMessage}</span>
              </div>
            )}

            {/* Hidden honeypot field */}
            <input
              type="text"
              {...register("website")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 text-foreground">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sipho Ndlovu"
                  {...register("name")}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground"
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 text-foreground">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@company.co.za"
                  {...register("email")}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 text-foreground">
                  Contact Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+27 72 000 0000"
                  {...register("phone")}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground"
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 text-foreground">
                  Service Area of Interest *
                </label>
                <select
                  {...register("service")}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground font-sans"
                >
                  {contactServiceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.service.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 text-foreground">
                  Subject / Summary *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Custom CRM integration or urgent M365 email troubleshooting"
                  {...register("subject")}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground"
                />
                {errors.subject && (
                  <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 text-foreground">
                  Preferred Contact Channel
                </label>
                <select
                  {...register("preferredContact")}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground font-sans"
                >
                  <option value="Email">Email response</option>
                  <option value="Phone">Phone call</option>
                  <option value="Either">Either channel</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 text-foreground">
                Project or Problem Description *
              </label>
              <textarea
                rows={5}
                placeholder="Please describe your software requirements, system issues, or operational analytics goals..."
                {...register("message")}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground leading-relaxed"
              />
              {errors.message && (
                <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.message.message}</p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="md"
                disabled={submissionStatus === "submitting"}
                className="w-full justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3"
              >
                {submissionStatus === "submitting" ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-1" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
