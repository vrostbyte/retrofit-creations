/*
  Login page — wired to Supabase Auth (Phase 2A).
  Light-body theme (PRD v1.2.0).
*/
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : authError.message
      );
      setLoading(false);
    } else {
      // Refresh the page so the server-side session is picked up
      router.push("/account");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#F8F8F8]">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#E8E8E8] rounded-xl p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black text-center mb-2">
            Sign In
          </h1>
          <p className="text-gray-500 text-sm text-center font-body mb-8">
            Welcome back to Retrofit Creations
          </p>

          {/* Show login error if credentials are wrong */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-body">
              {error}
            </div>
          )}

          {/* Show success after email confirmation redirect */}
          {typeof window !== "undefined" &&
            new URLSearchParams(window.location.search).get("confirmed") && (
              <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-body">
                Email confirmed! You can now sign in.
              </div>
            )}

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
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E8E8]" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 uppercase tracking-widest font-heading">
              <span className="bg-white px-3">or</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 border border-[#E8E8E8] rounded-md text-sm font-heading font-semibold uppercase tracking-wider text-gray-600 hover:border-brand-blue/40 hover:text-brand-blue transition-colors bg-white"
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

          <p className="text-center text-sm text-gray-500 font-body mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/account/signup"
              className="text-brand-blue hover:underline font-semibold"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
