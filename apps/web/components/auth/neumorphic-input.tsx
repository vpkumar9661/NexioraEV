"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
  accentColor?: string;
}

export const NeumorphicInput = forwardRef<HTMLInputElement, NeumorphicInputProps>(
  (
    {
      label,
      icon,
      error,
      isPassword,
      accentColor = "#00E676",
      type = "text",
      id,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5 text-left">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold tracking-wide text-slate-300 select-none"
        >
          {label}
        </label>

        <div className="relative group">
          {/* Left Icon */}
          {icon && (
            <div
              className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none z-10"
              style={{
                color: isFocused ? accentColor : "#64748B",
              }}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={`
              w-full h-11.5 text-sm text-slate-100 placeholder-slate-500 font-normal rounded-xl
              transition-all duration-200 ease-out outline-hidden
              ${icon ? "pl-10.5" : "pl-4"}
              ${isPassword ? "pr-11" : "pr-4"}
              ${
                error
                  ? "border border-rose-500/80 ring-2 ring-rose-500/20"
                  : "border border-white/8"
              }
              ${className}
            `}
            style={{
              backgroundColor: "#0C1019",
              borderColor: !error && isFocused ? accentColor : undefined,
              boxShadow: isFocused
                ? `inset 1px 1px 4px rgba(0, 0, 0, 0.5), inset -1px -1px 2px rgba(255, 255, 255, 0.03), 0 0 0 3px ${accentColor}25`
                : "inset 2px 2px 5px rgba(0, 0, 0, 0.55), inset -1px -1px 3px rgba(255, 255, 255, 0.04)",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Password Visibility Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 focus:outline-hidden transition-colors cursor-pointer"
              style={{
                color: isFocused ? accentColor : undefined,
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 transition-transform duration-200 hover:scale-110" />
              ) : (
                <Eye className="w-4 h-4 transition-transform duration-200 hover:scale-110" />
              )}
            </button>
          )}
        </div>

        {/* Inline Error Message */}
        {error && (
          <p className="text-xs text-rose-400 font-medium pt-0.5 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);

NeumorphicInput.displayName = "NeumorphicInput";
