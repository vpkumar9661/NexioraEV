"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

import { loginSchema, type LoginInput } from "@nexiora/shared";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ─── Styles injected via <style> to keep the glass card premium ───
const LOGIN_CARD_STYLES = `
  /* Glass card base */
  .auth-glass-card {
    position: relative;
    background: linear-gradient(
      165deg,
      rgba(13, 24, 35, 0.72) 0%,
      rgba(13, 24, 35, 0.66) 40%,
      rgba(8, 16, 28, 0.78) 100%
    );
    backdrop-filter: blur(28px) saturate(160%);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 28px;
    box-shadow:
      0 0 0 1px rgba(0, 245, 160, 0.06),
      0 8px 40px -8px rgba(0, 0, 0, 0.5),
      0 0 80px -20px rgba(0, 245, 160, 0.08),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
      inset 0 -1px 0 0 rgba(0, 0, 0, 0.15);
    overflow: hidden;
    animation: auth-card-entrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  /* Moving border illumination */
  .auth-glass-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 29px;
    padding: 1px;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      rgba(0, 245, 160, 0.3) 10%,
      transparent 20%,
      transparent 45%,
      rgba(0, 217, 255, 0.25) 55%,
      transparent 65%,
      transparent 90%,
      rgba(0, 245, 160, 0.15) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: auth-border-glow-rotate 8s linear infinite;
    pointer-events: none;
  }

  /* Glass shimmer reflection */
  .auth-glass-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255, 255, 255, 0.03) 45%,
      rgba(255, 255, 255, 0.06) 50%,
      rgba(255, 255, 255, 0.03) 55%,
      transparent 70%
    );
    animation: auth-glass-shimmer 12s ease-in-out 2s infinite;
    pointer-events: none;
    z-index: 0;
  }

  /* Top glass highlight bar */
  .auth-glass-highlight {
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.15) 25%,
      rgba(0, 245, 160, 0.2) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 100%
    );
    pointer-events: none;
  }

  /* Premium input styling */
  .auth-premium-input {
    height: 48px;
    background: rgba(8, 16, 28, 0.6) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 14px !important;
    color: #F7FAFC !important;
    font-size: 0.925rem !important;
    padding-left: 44px !important;
    padding-right: 16px !important;
    transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1) !important;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2) !important;
  }

  .auth-premium-input::placeholder {
    color: #6B7A8D !important;
  }

  .auth-premium-input:focus {
    border-color: rgba(0, 245, 160, 0.5) !important;
    box-shadow:
      0 0 0 3px rgba(0, 245, 160, 0.1),
      inset 0 1px 2px rgba(0, 0, 0, 0.15) !important;
    background: rgba(10, 20, 34, 0.7) !important;
    outline: none !important;
  }

  .auth-premium-input.has-action {
    padding-right: 44px !important;
  }

  .auth-input-action {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: #6B7A8D;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease;
  }

  .auth-input-action:hover {
    color: #00F5A0;
    background: rgba(0, 245, 160, 0.08);
  }

  .auth-input-action:focus-visible {
    outline: 2px solid rgba(0, 245, 160, 0.5);
    outline-offset: 1px;
    color: #00F5A0;
  }

  .auth-error-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.25);
    color: #FCA5A5;
    font-size: 0.85rem;
    margin-bottom: 16px;
    animation: auth-card-entrance 0.3s ease-out;
  }

  /* Premium button */
  .auth-premium-btn {
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #00F5A0 0%, #00D68F 50%, #00C07B 100%);
    color: #050A12;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow:
      0 4px 20px -4px rgba(0, 245, 160, 0.35),
      0 0 40px -10px rgba(0, 245, 160, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
    overflow: hidden;
  }

  .auth-premium-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.15) 50%,
      transparent 100%
    );
    transition: left 0.5s ease;
    pointer-events: none;
  }

  .auth-premium-btn:hover {
    transform: translateY(-1.5px);
    box-shadow:
      0 6px 28px -4px rgba(0, 245, 160, 0.45),
      0 0 60px -10px rgba(0, 245, 160, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
    filter: brightness(1.08);
  }

  .auth-premium-btn:hover::before {
    left: 120%;
  }

  .auth-premium-btn:active {
    transform: translateY(0.5px) scale(0.99);
    box-shadow:
      0 2px 12px -2px rgba(0, 245, 160, 0.3),
      inset 0 1px 3px rgba(0, 0, 0, 0.15);
    filter: brightness(0.95);
  }

  .auth-premium-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
    filter: none !important;
  }

  /* Link hover effect */
  .auth-link {
    color: #00F5A0;
    font-weight: 500;
    text-decoration: none;
    transition: all 200ms ease;
    position: relative;
  }

  .auth-link:hover {
    color: #39E8C8;
    text-shadow: 0 0 12px rgba(0, 245, 160, 0.3);
  }

  .auth-link:focus-visible {
    outline: 2px solid rgba(0, 245, 160, 0.5);
    outline-offset: 2px;
    border-radius: 4px;
  }

  .auth-forgot-link {
    color: #00D9FF;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 200ms ease;
  }

  .auth-forgot-link:hover {
    color: #39E8C8;
    text-shadow: 0 0 10px rgba(0, 217, 255, 0.25);
  }

  .auth-forgot-link:focus-visible {
    outline: 2px solid rgba(0, 217, 255, 0.5);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Backdrop filter fallback */
  @supports not (backdrop-filter: blur(28px)) {
    .auth-glass-card {
      background: rgba(13, 24, 35, 0.92) !important;
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // TODO: Replace with actual API call
      console.log("Logging in with:", data);

      // Redirect to dashboard or home after successful login
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Authentication failed. Please verify your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LOGIN_CARD_STYLES }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div ref={cardRef} className="auth-glass-card">
          {/* Top glass highlight */}
          <div className="auth-glass-highlight" />

          {/* ─── Card Content ─── */}
          <div className="relative z-10 px-8 pt-10 pb-8 sm:px-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-[1.65rem] font-bold tracking-tight mb-2"
                style={{ color: "#F7FAFC" }}
              >
                Welcome back
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "#A8B7C5" }}>
                Sign in to continue your electric mobility journey.
              </p>
            </div>

            {/* Error Message if present */}
            {errorMessage && (
              <div className="auth-error-banner" role="alert">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" style={{ color: "#CBD5E1" }}>
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 auth-input-icon transition-colors duration-200 pointer-events-none"
                            size={18}
                            style={{ color: "#6B7A8D" }}
                          />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                            disabled={isLoading}
                            className="auth-premium-input"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium" style={{ color: "#CBD5E1" }}>
                          Password
                        </FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="auth-forgot-link"
                          tabIndex={-1}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Lock
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 auth-input-icon transition-colors duration-200 pointer-events-none"
                            size={18}
                            style={{ color: "#6B7A8D" }}
                          />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                            className="auth-premium-input has-action"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="auth-input-action"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            tabIndex={0}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sign In Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="auth-premium-btn w-full inline-flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign in</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Form>

            {/* Footer / Sign-up Link */}
            <div
              className="mt-8 pt-6 text-center text-sm"
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#8494A7",
              }}
            >
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="auth-link">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
