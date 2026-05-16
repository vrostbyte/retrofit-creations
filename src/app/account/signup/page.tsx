/*
  Signup page — /account/signup
  Registration form UI shell. Supabase Auth wired in Phase 2.
*/
"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (form.password.length < 8) errs.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    /* Phase 2: call Supabase Auth signUp */
    alert("Account creation will be wired in Phase 2.");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-brand-blue/20 rounded-xl p-8 shadow-[0_0_40px_rgba(0,98,255,0.08)]">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-brand-white text-center mb-2">
            Create Account
          </h1>
          <p className="text-zinc-500 text-sm text-center font-body mb-8">
            Join the Retrofit Creations community
          </p>

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
            <Button type="submit" variant="primary" size="lg">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-500 font-body mt-6">
            Already have an account?{" "}
            <Link href="/account/login" className="text-brand-blue hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
