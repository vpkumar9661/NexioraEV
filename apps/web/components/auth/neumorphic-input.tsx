"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface NeumorphicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

export const NeumorphicInput = forwardRef<HTMLInputElement, NeumorphicInputProps>(
  ({ label, icon, error, isPassword, type = "text", id, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5 text-left">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold tracking-wide text-slate-700 select-none"
        >
          {label}
        </label>

        <div className="relative group">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors duration-200 pointer-events-none z-10">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={`
              w-full h-11.5 text-sm text-slate-800 placeholder-slate-400 font-normal rounded-xl
              transition-all duration-200 ease-out outline-hidden
              ${icon ? "pl-10.5" : "pl-4"}
              ${isPassword ? "pr-11" : "pr-4"}
              ${
                error
                  ? "border border-rose-300 ring-2 ring-rose-400/15"
                  : "border border-slate-200/80 focus:border-emerald-500/80"
              }
              ${className}
            `}
            style={{
              backgroundColor: "#EEF1F5",
              boxShadow:
                "inset 2px 2px 4px rgba(166, 175, 195, 0.28), inset -2px -2px 4px rgba(255, 255, 255, 0.9)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "inset 1px 1px 3px rgba(166, 175, 195, 0.2), inset -1px -1px 3px rgba(255, 255, 255, 0.8), 0 0 0 3px rgba(0, 210, 106, 0.14)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow =
                "inset 2px 2px 4px rgba(166, 175, 195, 0.28), inset -2px -2px 4px rgba(255, 255, 255, 0.9)";
            }}
            {...props}
          />

          {/* Password Visibility Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 focus:outline-hidden focus:text-emerald-600 transition-colors"
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
          <p className="text-xs text-rose-500 font-medium pt-0.5 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);

NeumorphicInput.displayName = "NeumorphicInput";
