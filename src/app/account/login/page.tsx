/*
  Login page — /account/login
  UI shell for Phase 1. Supabase Auth wired in Phase 2.
*/
"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* Phase 2: call Supabase Auth signInWithPassword */
    alert("Auth will be wired in Phase 2. Form captured: " + email);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-zinc-900 border border-brand-blue/20 rounded-xl p-8 shadow-[0_0_40px_rgba(0,98,255,0.08)]">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-brand-white text-center mb-2">
            Sign In
          </h1>
          <p className="text-zinc-500 text-sm text-center font-body mb-8">
            Welcome back to Retrofit Creations
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <div className="flex flex-col gap-1.5">
              <Input
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <Link
                href="/account/forgot-password"
                className="text-xs text-brand-blue hover:underline text-right font-body"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg">
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-blue/15" />
            </div>
            <div className="relative flex justify-center text-xs text-zinc-500 uppercase tracking-widest font-heading">
              <span className="bg-zinc-900 px-3">or</span>
            </div>
          </div>

          {/* Google OAuth — placeholder for Phase 3 */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 border border-brand-blue/20 rounded-md text-sm font-heading font-semibold uppercase tracking-wider text-zinc-300 hover:border-brand-blue/50 hover:text-brand-blue transition-colors"
            onClick={() => alert("Google OAuth coming in Phase 3")}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-zinc-500 font-body mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/account/signup" className="text-brand-blue hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
