import type { Metadata } from "next";
import { Suspense } from "react";
import { UnifiedAuth } from "@/components/auth/unified-auth";

export const metadata: Metadata = {
  title: "Reset Password | NexioraEV",
  description: "Reset your NexioraEV account password.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-5xl mx-auto h-150 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UnifiedAuth initialMode="forgot-password" />
    </Suspense>
  );
}
