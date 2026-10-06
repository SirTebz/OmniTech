"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema, ContactFormData } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

const projectTypes = [
  "Website",
  "Web Application",
  "Custom Software",
  "Website Improvement",
  "Technical Support",
  "Other",
];

const budgetRanges = [
  "R15,000 - R30,000",
  "R30,000 - R60,000",
  "R60,000 - R120,000",
  "R120,000+",
  "Flexible / Not sure yet",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "Website",
      budgetRange: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit your inquiry. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again or email us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 sm:p-10 rounded-2xl border border-border bg-card shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Message received.</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to OmniTech. We have received your project details and will review them shortly. You can expect a response within 24 business hours.
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 sm:p-10 rounded-2xl border border-border bg-card shadow-sm space-y-6"
      noValidate
    >
      {/* Honeypot anti-spam field */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
      />

      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-mono uppercase font-semibold text-foreground">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-[11px] text-red-500 font-mono">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-mono uppercase font-semibold text-foreground">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane@company.com"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 font-mono">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="company" className="block text-xs font-mono uppercase font-semibold text-foreground">
            Company / Organisation <span className="text-muted-foreground font-normal">(Optional)</span>
          </label>
          <input
            id="company"
            type="text"
            placeholder="Acme Inc."
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            {...register("company")}
          />
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <label htmlFor="projectType" className="block text-xs font-mono uppercase font-semibold text-foreground">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            {...register("projectType")}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget Range */}
      <div className="space-y-2">
        <label htmlFor="budgetRange" className="block text-xs font-mono uppercase font-semibold text-foreground">
          Estimated Budget Range <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <select
          id="budgetRange"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          {...register("budgetRange")}
        >
          <option value="">Select a range (flexible)</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs font-mono uppercase font-semibold text-foreground">
          Project Details & Objectives <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about what you want to build, the key features, timeline, or current challenges..."
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-y"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <p className="text-[11px] text-red-500 font-mono">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto font-semibold"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Send Project Inquiry</span>
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
