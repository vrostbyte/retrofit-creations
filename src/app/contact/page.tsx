/*
  Contact / Custom Quote page — PRD Section 5.9
  Full quote request form with all fields from the PRD.
  Frontend validation only in Phase 1 — form submission wired in Phase 2.
*/
"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

const SERVICE_OPTIONS = [
  { value: "laser-engraving", label: "Laser Engraving" },
  { value: "3d-printing", label: "3D Printing" },
  { value: "cnc-carving", label: "CNC Carving" },
  { value: "prototyping", label: "Product Prototyping" },
  { value: "custom-auto", label: "Custom Automotive Trim/Accessories" },
  { value: "bulk-orders", label: "Bulk / Custom Orders" },
  { value: "design-consultation", label: "Design Consultation" },
  { value: "other", label: "Other / Not Sure" },
];

const BUDGET_OPTIONS = [
  { value: "under-50", label: "Under $50" },
  { value: "50-100", label: "$50 – $100" },
  { value: "100-250", label: "$100 – $250" },
  { value: "250-500", label: "$250 – $500" },
  { value: "500-plus", label: "$500+" },
  { value: "not-sure", label: "Not Sure" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  quantity: string;
  budgetRange: string;
  deadline: string;
  description: string;
  preferredContact: "email" | "phone" | "text";
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    quantity: "",
    budgetRange: "",
    deadline: "",
    description: "",
    preferredContact: "email",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  /* Basic frontend validation — API submission wired in Phase 2 */
  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.serviceType) errs.serviceType = "Please select a service type";
    if (!form.description.trim()) errs.description = "Please describe your project";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    /* Phase 2: POST to /api/quotes here */
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold uppercase tracking-widest text-brand-white mb-4">
          Quote Request Received!
        </h1>
        <p className="text-zinc-400 font-body mb-6 leading-relaxed">
          Thanks, {form.name}! We&apos;ve received your request and will get back to you within <strong className="text-brand-white">24–48 hours</strong> via {form.preferredContact}.
        </p>
        <Button variant="secondary" href="/">Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Get a Free Quote"
        subtitle="Tell us about your project. We'll respond within 24–48 hours."
        className="mb-12"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ── Quote Form (2/3 width) ──────────────────────────── */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-6" noValidate>
          {/* Personal info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Your Name"
              name="name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              error={errors.name}
              placeholder="Hailie Smith"
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              error={errors.email}
              placeholder="hailie@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Phone (Optional)"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="(619) 555-0100"
            />
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => setField("quantity", e.target.value)}
              placeholder="1"
              min={1}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Service Type"
              name="serviceType"
              type="select"
              options={SERVICE_OPTIONS}
              value={form.serviceType}
              onChange={(e) => setField("serviceType", e.target.value)}
              error={errors.serviceType}
              required
            />
            <Input
              label="Budget Range"
              name="budgetRange"
              type="select"
              options={BUDGET_OPTIONS}
              value={form.budgetRange}
              onChange={(e) => setField("budgetRange", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Needed By (Optional)"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => setField("deadline", e.target.value)}
            />
            {/* File upload — Phase 2 wires to Supabase Storage */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-heading font-medium uppercase tracking-wider text-zinc-300">
                Reference Images <span className="text-zinc-500 normal-case tracking-normal font-body font-normal">(optional)</span>
              </label>
              <input
                type="file"
                name="files"
                multiple
                accept="image/*,.pdf"
                className="w-full text-sm text-zinc-400 border border-dashed border-brand-blue/30 rounded-md p-4 cursor-pointer
                  file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                  file:text-sm file:font-heading file:font-semibold file:uppercase file:tracking-wider
                  file:bg-brand-blue/20 file:text-brand-blue file:cursor-pointer hover:file:bg-brand-blue/30"
              />
              <p className="text-xs text-zinc-600 font-body">JPG, PNG, PDF. Sketches, inspiration photos, measurements welcome.</p>
            </div>
          </div>

          <Input
            label="Project Description"
            name="description"
            type="textarea"
            rows={5}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            error={errors.description}
            placeholder="Describe what you want made. The more detail the better — materials, dimensions, finish, intended use, vehicle year/make/model if applicable."
            required
          />

          {/* Preferred contact method */}
          <div>
            <p className="text-sm font-heading font-medium uppercase tracking-wider text-zinc-300 mb-3">
              Preferred Contact Method <span className="text-brand-blue">*</span>
            </p>
            <div className="flex gap-6">
              {(["email", "phone", "text"] as const).map((method) => (
                <label key={method} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={form.preferredContact === method}
                    onChange={() => setField("preferredContact", method)}
                    className="w-4 h-4 accent-brand-blue"
                  />
                  <span className="font-heading text-sm font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-brand-blue transition-colors capitalize">
                    {method}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg">
            Submit Quote Request
          </Button>
        </form>

        {/* ── Business Info Sidebar ───────────────────────────── */}
        <aside className="flex flex-col gap-6">
          <div className="p-6 bg-zinc-900 border border-brand-blue/15 rounded-xl">
            <h3 className="font-heading font-bold text-base uppercase tracking-widest text-brand-white mb-5">
              Contact Info
            </h3>
            <div className="flex flex-col gap-4 text-sm font-body">
              <div>
                <p className="text-zinc-500 uppercase tracking-wider text-xs font-heading mb-1">Location</p>
                <p className="text-zinc-300">San Diego, CA</p>
                <p className="text-zinc-500 text-xs">Ships worldwide</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-wider text-xs font-heading mb-1">Email</p>
                <a href="mailto:hello@retrofitcreations.com" className="text-brand-blue hover:underline">
                  hello@retrofitcreations.com
                </a>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-wider text-xs font-heading mb-1">Response Time</p>
                <p className="text-zinc-300">Within 24–48 hours</p>
                <p className="text-zinc-500 text-xs">Mon–Sat, 8am–8pm PT</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-wider text-xs font-heading mb-1">Social</p>
                <div className="flex flex-col gap-1">
                  {["Instagram", "Facebook", "TikTok"].map((s) => (
                    <a key={s} href="#" className="text-zinc-400 hover:text-brand-blue transition-colors">
                      {s} (coming soon)
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
            <p className="font-heading font-semibold text-sm uppercase tracking-wider text-brand-white mb-2">
              Rush Orders
            </p>
            <p className="text-zinc-400 text-sm font-body leading-relaxed">
              Need it fast? Mention your deadline in the description and we&apos;ll do our best to accommodate. Rush fees may apply.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
