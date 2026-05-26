/*
  Signup page — wired to Supabase Auth (Phase 2A).
  Light-body theme (PRD v1.2.0).
*/
"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    const supabase = createClient();

    // Sign up — Supabase sends a confirmation email automatically.
    // We pass full_name so the handle_new_user trigger can store it.
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.fullName },
        // After email confirmation, redirect to login with a flag
        emailRedirectTo: `${window.location.origin}/account/login?confirmed=true`,
      },
    });

    if (authError) {
      setErrors({ submit: authError.message });
      setLoading(false);
    } else {
      // Show success state — user needs to check their email
      setSuccess(true);
      setLoading(false);
    }
  };

  // Show the "check your email" screen after successful signup
  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#F8F8F8]">
        <div className="w-full max-w-md">
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-brand-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black mb-2">
              Check Your Email
            </h1>
            <p className="text-gray-600 font-body mb-6">
              We sent a confirmation link to{" "}
              <span className="font-semibold text-black">{form.email}</span>.
              Click the link to activate your account.
            </p>
            <p className="text-gray-400 text-sm font-body">
              Didn&apos;t get it? Check your spam folder.
            </p>
            <Link
              href="/account/login"
              className="inline-block mt-6 text-brand-blue hover:underline text-sm font-body font-semibold"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#F8F8F8]">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#E8E8E8] rounded-xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black text-center mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm text-center font-body mb-8">
            Join the Retrofit Creations community
          </p>

          {errors.submit && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-body">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <Input
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              error={errors.fullName}
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
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              error={errors.password}
              placeholder="At least 8 characters"
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setField("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              placeholder="Repeat your password"
              required
            />
            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 font-body mt-6">
            Already have an account?{" "}
            <Link
              href="/account/login"
              className="text-brand-blue hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
