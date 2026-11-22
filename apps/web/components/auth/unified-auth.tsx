"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { APP_NAME } from "@nexiora/shared";
import { apiRequest, ApiClientError } from "@/lib/api-client";
import { NeumorphicInput } from "./neumorphic-input";

type AuthMode = "login" | "register" | "forgot-password";

interface UnifiedAuthProps {
  initialMode?: AuthMode;
}

export function UnifiedAuth({ initialMode = "login" }: UnifiedAuthProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize rememberMe from localStorage
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("nexiora_remember_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Sync mode with query/route changes
  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMessage(null);
    setSuccessMessage(null);
    setErrors({});
    try {
      const targetPath =
        newMode === "register"
          ? "/auth/register"
          : newMode === "forgot-password"
          ? "/auth/forgot-password"
          : "/auth/login";
      window.history.replaceState(null, "", targetPath);
    } catch {
      // Ignore history state errors in restricted environments
    }
  };

  // Client Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (mode === "login" || mode === "register") {
      if (!password) {
        errs.password = "Password is required";
      } else if (mode === "register" && password.length < 8) {
        errs.password = "Password must be at least 8 characters";
      }
    }

    if (mode === "register") {
      if (!name.trim()) {
        errs.name = "Full name is required";
      } else if (name.trim().length < 2) {
        errs.name = "Name must be at least 2 characters";
      }

      if (password !== confirmPassword) {
        errs.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (mode === "login") {
        if (rememberMe) {
          localStorage.setItem("nexiora_remember_email", email.trim());
        } else {
          localStorage.removeItem("nexiora_remember_email");
        }

        try {
          const res = await apiRequest<{
            user: { id: string; email: string; name: string };
            tokens: { accessToken: string; refreshToken: string };
          }>("/auth/login", {
            method: "POST",
            body: { email: email.trim().toLowerCase(), password },
          });

          if (res?.tokens) {
            localStorage.setItem("nexiora_access_token", res.tokens.accessToken);
            localStorage.setItem("nexiora_refresh_token", res.tokens.refreshToken);
            localStorage.setItem("nexiora_user", JSON.stringify(res.user));
          }
        } catch (apiErr: unknown) {
          if (apiErr instanceof ApiClientError) {
            if (apiErr.status === 401) {
              setErrorMessage("Invalid email or password. Please verify your credentials.");
              setIsLoading(false);
              return;
            }
            setErrorMessage(apiErr.message);
            setIsLoading(false);
            return;
          }
          setErrorMessage("Unable to connect to authentication server. Please check your connection or try again shortly.");
          setIsLoading(false);
          return;
        }

        const redirectUrl = searchParams.get("redirect") || "/";
        router.push(redirectUrl);
      } else if (mode === "register") {
        try {
          const res = await apiRequest<{
            user: { id: string; email: string; name: string };
            tokens: { accessToken: string; refreshToken: string };
          }>("/auth/register", {
            method: "POST",
            body: {
              name: name.trim(),
              email: email.trim().toLowerCase(),
              password,
            },
          });

          if (res?.tokens) {
            localStorage.setItem("nexiora_access_token", res.tokens.accessToken);
            localStorage.setItem("nexiora_refresh_token", res.tokens.refreshToken);
            localStorage.setItem("nexiora_user", JSON.stringify(res.user));
          }
          setSuccessMessage("Account created successfully! Redirecting...");
          setTimeout(() => {
            const redirectUrl = searchParams.get("redirect") || "/";
            router.push(redirectUrl);
          }, 1200);
        } catch (apiErr: unknown) {
          if (apiErr instanceof ApiClientError) {
            if (apiErr.status === 409) {
              setErrorMessage("An account with this email address already exists.");
              setIsLoading(false);
              return;
            }
            setErrorMessage(apiErr.message);
            setIsLoading(false);
            return;
          }
          setErrorMessage("Unable to connect to registration server. Please try again shortly.");
          setIsLoading(false);
          return;
        }
      } else if (mode === "forgot-password") {
        setSuccessMessage("If an account exists with this email, a password reset link has been sent.");
        setIsLoading(false);
      }
    } catch (err: unknown) {
      console.error("Auth error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      if (mode !== "register" || errorMessage) {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[430px] mx-auto rounded-3xl p-7 sm:p-9 relative z-10 border border-white/[0.08]"
      style={{
        backgroundColor: "#121824",
        boxShadow:
          "0 24px 60px -12px rgba(0, 0, 0, 0.7), 0 8px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)",
      }}
    >
      {/* ── Logo & Brand ── */}
      <div className="flex flex-col items-center justify-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center transition-transform hover:scale-105 duration-200"
          aria-label="NexioraEV Home"
        >
          <Image
            src="/brand/nexiora-logo.png"
            alt={APP_NAME || "NexioraEV"}
            width={970}
            height={299}
            priority
            className="h-8.5 sm:h-9.5 w-auto object-contain select-none"
          />
        </Link>
      </div>

      {/* ── Global Alerts ── */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-medium leading-relaxed"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium leading-relaxed"
          role="status"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
          <span>{successMessage}</span>
        </motion.div>
      )}

      {/* ── Dynamic Form Switching (Login / Register / Forgot Password) ── */}
      <AnimatePresence mode="wait">
        {mode === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Sign in to your NexioraEV account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <NeumorphicInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                error={errors.email}
                disabled={isLoading}
                autoComplete="email"
              />

              <NeumorphicInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                isPassword
                error={errors.password}
                disabled={isLoading}
                autoComplete="current-password"
              />

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md border-slate-700 bg-[#0C1019] text-emerald-500 focus:ring-emerald-500/20 transition cursor-pointer"
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => switchMode("forgot-password")}
                  className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-linear-to-r from-[#00D26A] to-[#00D9FF] hover:opacity-95 active:scale-[0.985] text-[#050A12] font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Switching Link */}
              <div className="text-center pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {mode === "register" && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Create Your Account
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Join the NexioraEV ecosystem.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <NeumorphicInput
                label="Full Name"
                type="text"
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="w-4 h-4" />}
                error={errors.name}
                disabled={isLoading}
                autoComplete="name"
              />

              <NeumorphicInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                error={errors.email}
                disabled={isLoading}
                autoComplete="email"
              />

              <NeumorphicInput
                label="Password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                isPassword
                error={errors.password}
                disabled={isLoading}
                autoComplete="new-password"
              />

              <NeumorphicInput
                label="Confirm Password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                isPassword
                error={errors.confirmPassword}
                disabled={isLoading}
                autoComplete="new-password"
              />

              {/* Primary Register Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-linear-to-r from-[#00D26A] to-[#00D9FF] hover:opacity-95 active:scale-[0.985] text-[#050A12] font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Switching Link */}
              <div className="text-center pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-slate-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {mode === "forgot-password" && (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Reset Your Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Enter your email address to receive a password reset link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <NeumorphicInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                error={errors.email}
                disabled={isLoading}
                autoComplete="email"
              />

              {/* Primary Reset Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-linear-to-r from-[#00D26A] to-[#00D9FF] hover:opacity-95 active:scale-[0.985] text-[#050A12] font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Back to Sign In Link */}
              <div className="text-center pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-slate-400">
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
