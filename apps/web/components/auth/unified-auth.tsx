"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Power,
} from "lucide-react";
import { APP_NAME } from "@nexiora/shared";
import { apiRequest, ApiClientError } from "@/lib/api-client";
import { NeumorphicInput } from "./neumorphic-input";
import { LampColorSelector } from "./lamp-color-selector";
import { LampColorId, LAMP_THEMES } from "./lamp-theme";

// Dynamically import the 3D scene (SSR disabled – Three.js needs the browser)
const LampScene = dynamic(
  () => import("./lamp-scene").then((m) => m.LampScene),
  { ssr: false }
);

type AuthMode = "login" | "register" | "forgot-password";

interface UnifiedAuthProps {
  initialMode?: AuthMode;
}

export function UnifiedAuth({ initialMode = "login" }: UnifiedAuthProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Lamp Lighting State
  const [activeThemeId, setActiveThemeId] = useState<LampColorId>("amber");
  const [isLampOn, setIsLampOn] = useState<boolean>(false);
  const [resetCount, setResetCount] = useState(0);

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

  // Convert hex to rgb tuple for Three.js
  const lampRgb: [number, number, number] = useMemo(() => {
    const parts = activeTheme.rgb.split(",").map((s) => parseFloat(s.trim()));
    return [
      (parts[0] ?? 0) / 255,
      (parts[1] ?? 0) / 255,
      (parts[2] ?? 0) / 255,
    ];
  }, [activeTheme.rgb]);

  // Initialize theme and rememberMe from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(
        "nexiora_lamp_theme"
      ) as LampColorId;
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
            localStorage.setItem(
              "nexiora_access_token",
              res.tokens.accessToken
            );
            localStorage.setItem(
              "nexiora_refresh_token",
              res.tokens.refreshToken
            );
            localStorage.setItem("nexiora_user", JSON.stringify(res.user));
          }
        } catch (apiErr: unknown) {
          if (apiErr instanceof ApiClientError) {
            if (apiErr.status === 401) {
              setErrorMessage(
                "Invalid email or password. Please verify your credentials."
              );
              setIsLoading(false);
              return;
            }
            setErrorMessage(apiErr.message);
            setIsLoading(false);
            return;
          }
          setErrorMessage(
            "Unable to connect to authentication server. Please check your connection or try again shortly."
          );
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
            localStorage.setItem(
              "nexiora_access_token",
              res.tokens.accessToken
            );
            localStorage.setItem(
              "nexiora_refresh_token",
              res.tokens.refreshToken
            );
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
              setErrorMessage(
                "An account with this email address already exists."
              );
              setIsLoading(false);
              return;
            }
            setErrorMessage(apiErr.message);
            setIsLoading(false);
            return;
          }
          setErrorMessage(
            "Unable to connect to registration server. Please try again shortly."
          );
          setIsLoading(false);
          return;
        }
      } else if (mode === "forgot-password") {
        setSuccessMessage(
          "If an account exists with this email, a password reset link has been sent."
        );
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
      className="w-full max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-start relative z-10 px-4 pt-6 pb-8"
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
      <div className="w-full max-w-6xl flex items-center justify-between mb-4 z-30 relative">
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

        {/* Dynamic Lamp Color Selector & Reset Control */}
        <LampColorSelector
          activeThemeId={activeThemeId}
          onSelectTheme={handleSelectTheme}
          isOn={isLampOn}
          onTogglePower={handleTogglePower}
          onResetLamp={() => setResetCount((c) => c + 1)}
        />
      </div>

      {/* ── Main Composition: 3D Lamp (Left) & Auth Card / Turn-on Screen (Right) ── */}
      <div className="w-full max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-center relative min-h-[560px]">
        {/* LEFT COLUMN: 3D Interactive Desk Lamp */}
        <div className="lg:col-span-6 flex items-center justify-center relative order-1 h-80 sm:h-96 lg:h-[600px] w-full">
          <LampScene
            isOn={isLampOn}
            lampColor={activeTheme.hex}
            lampRgb={lampRgb}
            onToggle={handleTogglePower}
            resetTrigger={resetCount}
          />

          {/* Interactive hint on the lamp */}
          <div className="absolute bottom-2 left-6 px-3 py-1 rounded-full bg-[#11141D]/80 border border-white/[0.08] text-[11px] text-slate-400 select-none flex items-center gap-2 backdrop-blur-xs">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: isLampOn ? activeTheme.accent : "#64748B" }}
            />
            <span>Drag head to tilt • Click lamp to power {isLampOn ? "off" : "on"}</span>
          </div>

          {/* ── Coloured glow pool on the desk (HTML ambient, behind card) ── */}
          <div
            className="absolute bottom-0 right-0 w-[120%] h-3/4 pointer-events-none transition-opacity duration-700 z-0"
            style={{
              opacity: isLampOn ? 0.6 : 0,
              background: `radial-gradient(ellipse 70% 50% at 70% 85%, rgba(${activeTheme.rgb}, 0.18) 0%, rgba(${activeTheme.rgb}, 0.04) 45%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* RIGHT COLUMN: Auth Card (When ON) OR "Turn on the lamp" (When OFF) */}
        <div className="lg:col-span-6 flex items-center justify-center relative order-2 w-full z-10 min-h-[460px]">
          <AnimatePresence mode="wait">
            {!isLampOn ? (
              <motion.div
                key="lamp-off-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full max-w-md flex flex-col items-center justify-center py-12 px-6 text-center select-none"
              >
                {/* Glowing Interactive Power Button */}
                <motion.button
                  type="button"
                  onClick={handleTogglePower}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-20 h-20 rounded-full border border-white/15 flex items-center justify-center mb-6 cursor-pointer relative group transition-all duration-300"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(10,14,22,0.8) 100%)",
                    boxShadow: "0 12px 32px -4px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)",
                  }}
                  aria-label="Turn lamp on"
                >
                  {/* Subtle outer breathing ring */}
                  <motion.span
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-emerald-400/30"
                  />
                  <Power className="w-8 h-8 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                </motion.button>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Turn on the lamp
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-xs leading-relaxed">
                  Switch on the lamp to access Sign In or Sign Up
                </p>

                {/* Arrow Hint */}
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-400/80 bg-emerald-950/30 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                  <span>Click to illuminate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="auth-card"
                initial={{ opacity: 0, x: 25, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 25, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
              >
                <motion.div
                  layout
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-3xl p-7 sm:p-9 relative z-10 border border-white/[0.08] backdrop-blur-xl"
                  style={{
                    backgroundColor: "rgba(17, 21, 31, 0.92)",
                    boxShadow: `0 24px 60px -12px rgba(0, 0, 0, 0.75), 0 0 60px -10px rgba(${activeTheme.rgb}, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
                  }}
                >
                  {/* ── Mode Pill Switcher (Sign In | Sign Up) ── */}
                  {mode !== "forgot-password" && (
                    <div className="grid grid-cols-2 p-1 mb-6 rounded-xl bg-black/40 border border-white/[0.05]">
                      <button
                        type="button"
                        onClick={() => switchMode("login")}
                        className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                          mode === "login"
                            ? "shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                        style={{
                          backgroundColor:
                            mode === "login"
                              ? activeTheme.accent
                              : "transparent",
                          color:
                            mode === "login"
                              ? activeTheme.buttonText
                              : undefined,
                        }}
                      >
                        Sign In
                      </button>

                      <button
                        type="button"
                        onClick={() => switchMode("register")}
                        className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                          mode === "register"
                            ? "shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                        style={{
                          backgroundColor:
                            mode === "register"
                              ? activeTheme.accent
                              : "transparent",
                          color:
                            mode === "register"
                              ? activeTheme.buttonText
                              : undefined,
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

                  {/* ── Dynamic Form Switching ── */}
                  <AnimatePresence mode="wait">
                    {mode === "login" && (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div className="mb-6">
                          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                            Welcome Back
                          </h1>
                          <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Sign in to your NexioraEV account.
                          </p>
                        </div>

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

                          <div className="flex items-center justify-between pt-1 text-xs">
                            <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                  setRememberMe(e.target.checked)
                                }
                                className="w-4 h-4 rounded-md border-slate-700 bg-black/40 cursor-pointer"
                                style={{ accentColor: activeTheme.accent }}
                              />
                              <span>Remember Me</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => switchMode("forgot-password")}
                              className="font-medium hover:underline transition-colors cursor-pointer"
                              style={{ color: activeTheme.accent }}
                            >
                              Forgot Password?
                            </button>
                          </div>

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
                                  <span>Sign In</span>
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>

                          {/* Bottom Link */}
                          <p className="text-center text-xs text-slate-500 pt-2">
                            Don&apos;t have an account?{" "}
                            <button
                              type="button"
                              onClick={() => switchMode("register")}
                              className="font-semibold hover:underline cursor-pointer"
                              style={{ color: activeTheme.accent }}
                            >
                              Sign Up
                            </button>
                          </p>
                        </form>
                      </motion.div>
                    )}

                    {mode === "register" && (
                      <motion.div
                        key="register"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div className="mb-6">
                          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                            Create Account
                          </h1>
                          <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Join the NexioraEV ecosystem.
                          </p>
                        </div>

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
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                            icon={<Lock className="w-4 h-4" />}
                            accentColor={activeTheme.accent}
                            isPassword
                            error={errors.confirmPassword}
                            disabled={isLoading}
                            autoComplete="new-password"
                          />

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
                                  <span>Create Account</span>
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>

                          <p className="text-center text-xs text-slate-500 pt-2">
                            Already have an account?{" "}
                            <button
                              type="button"
                              onClick={() => switchMode("login")}
                              className="font-semibold hover:underline cursor-pointer"
                              style={{ color: activeTheme.accent }}
                            >
                              Sign In
                            </button>
                          </p>
                        </form>
                      </motion.div>
                    )}

                    {mode === "forgot-password" && (
                      <motion.div
                        key="forgot-password"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div className="mb-6">
                          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                            Reset Password
                          </h1>
                          <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Enter your email to receive a password reset link.
                          </p>
                        </div>

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
                                  <span>Send Reset Link</span>
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>

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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
