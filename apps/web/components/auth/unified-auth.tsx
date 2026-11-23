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
import { DeskLamp } from "./desk-lamp";
import { LampColorSelector } from "./lamp-color-selector";
import { LampColorId, LAMP_THEMES } from "./lamp-theme";

type AuthMode = "login" | "register" | "forgot-password";

interface UnifiedAuthProps {
  initialMode?: AuthMode;
}

export function UnifiedAuth({ initialMode = "login" }: UnifiedAuthProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Lamp Lighting State
  const [activeThemeId, setActiveThemeId] = useState<LampColorId>("green");
  const [isLampOn, setIsLampOn] = useState<boolean>(true);

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

  const activeTheme = LAMP_THEMES[activeThemeId];

  // Initialize theme and rememberMe from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("nexiora_lamp_theme") as LampColorId;
      if (savedTheme && LAMP_THEMES[savedTheme]) {
        setActiveThemeId(savedTheme);
      }
      const savedEmail = localStorage.getItem("nexiora_remember_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSelectTheme = (id: LampColorId) => {
    setActiveThemeId(id);
    if (!isLampOn) setIsLampOn(true);
    try {
      localStorage.setItem("nexiora_lamp_theme", id);
    } catch {
      // Ignore
    }
  };

  const handleTogglePower = () => {
    setIsLampOn((prev) => !prev);
  };

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
    <div
      className="w-full max-w-6xl mx-auto min-h-[600px] flex flex-col items-center justify-center relative z-10 px-4 py-8"
      style={
        {
          "--lamp-color": activeTheme.hex,
          "--lamp-glow": activeTheme.glow,
          "--lamp-accent": activeTheme.accent,
          "--lamp-intensity": isLampOn ? "1" : "0.1",
        } as React.CSSProperties
      }
    >
      {/* ── Top Bar: Brand Logo & Lamp Color Selector ── */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 sm:mb-12 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
          aria-label="NexioraEV Home"
        >
          <Image
            src="/brand/nexiora-logo.png"
            alt={APP_NAME || "NexioraEV"}
            width={970}
            height={299}
            priority
            className="h-8 sm:h-9 w-auto object-contain select-none"
          />
        </Link>

        {/* Dynamic Lamp Color Selector (Amber, Cyan, Pink, Green, White) */}
        <LampColorSelector
          activeThemeId={activeThemeId}
          onSelectTheme={handleSelectTheme}
          isOn={isLampOn}
          onTogglePower={handleTogglePower}
        />
      </div>

      {/* ── Main Composition: Desk Lamp (Left) & Auth Card (Right) ── */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center">
        {/* LEFT COLUMN: Realistic Desk Lamp (45-50% width) */}
        <div className="lg:col-span-6 flex items-center justify-center relative order-1 lg:order-1">
          <DeskLamp
            theme={activeTheme}
            isOn={isLampOn}
            onToggle={handleTogglePower}
          />
        </div>

        {/* RIGHT COLUMN: Premium Authentication Card (45-50% width) */}
        <div className="lg:col-span-6 flex items-center justify-center relative order-2 lg:order-2 w-full">
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px] rounded-3xl p-7 sm:p-9 relative z-10 border border-white/[0.08]"
            style={{
              backgroundColor: "#11151F",
              boxShadow: isLampOn
                ? `0 24px 60px -12px rgba(0, 0, 0, 0.75), 0 0 40px -10px rgba(${activeTheme.rgb}, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)`
                : "0 24px 60px -12px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              transition: "box-shadow 0.6s ease",
            }}
          >
            {/* ── Mode Pill Switcher (Sign In | Sign Up) ── */}
            {mode !== "forgot-password" && (
              <div className="grid grid-cols-2 p-1 mb-6 rounded-xl bg-[#090D14] border border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    mode === "login"
                      ? "text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: mode === "login" ? activeTheme.accent : "transparent",
                    color: mode === "login" ? activeTheme.buttonText : undefined,
                  }}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    mode === "register"
                      ? "text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: mode === "register" ? activeTheme.accent : "transparent",
                    color: mode === "register" ? activeTheme.buttonText : undefined,
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}

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
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Welcome
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Sign in to continue to your account.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <NeumorphicInput
                      label="Username or Email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="w-4 h-4" />}
                      accentColor={activeTheme.accent}
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
                      accentColor={activeTheme.accent}
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
                          className="w-4 h-4 rounded-md border-slate-700 bg-[#0C1019] focus:ring-2 transition cursor-pointer"
                          style={{ accentColor: activeTheme.accent }}
                        />
                        <span>Remember me</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => switchMode("forgot-password")}
                        className="font-medium hover:underline transition-colors cursor-pointer"
                        style={{ color: activeTheme.accent }}
                      >
                        Forgot?
                      </button>
                    </div>

                    {/* Primary Sign In Button (Synchronized with Lamp Color) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 hover:opacity-95 active:scale-[0.985] font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: activeTheme.buttonGradient,
                          color: activeTheme.buttonText,
                          boxShadow: `0 4px 20px -2px ${activeTheme.glow}`,
                        }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Signing in...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign in</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
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
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Create Account
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
                      accentColor={activeTheme.accent}
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
                      accentColor={activeTheme.accent}
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
                      accentColor={activeTheme.accent}
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
                      accentColor={activeTheme.accent}
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
                        className="w-full h-12 hover:opacity-95 active:scale-[0.985] font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: activeTheme.buttonGradient,
                          color: activeTheme.buttonText,
                          boxShadow: `0 4px 20px -2px ${activeTheme.glow}`,
                        }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create account</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
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
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Reset Password
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Enter your email to receive a password reset link.
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
                      accentColor={activeTheme.accent}
                      error={errors.email}
                      disabled={isLoading}
                      autoComplete="email"
                    />

                    {/* Primary Reset Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 hover:opacity-95 active:scale-[0.985] font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: activeTheme.buttonGradient,
                          color: activeTheme.buttonText,
                          boxShadow: `0 4px 20px -2px ${activeTheme.glow}`,
                        }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending link...</span>
                          </>
                        ) : (
                          <>
                            <span>Send reset link</span>
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
                        className="font-semibold hover:underline transition-colors cursor-pointer"
                        style={{ color: activeTheme.accent }}
                      >
                        ← Back to Sign In
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
