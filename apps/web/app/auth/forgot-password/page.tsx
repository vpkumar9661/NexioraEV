import { Suspense } from "react";
import { UnifiedAuth } from "@/components/auth/unified-auth";

export const metadata = {
  title: "Reset Password | NexioraEV",
  description: "Reset your NexioraEV account password.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[430px] mx-auto bg-white rounded-3xl p-8 h-[380px] flex items-center justify-center shadow-xs">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UnifiedAuth initialMode="forgot-password" />
    </Suspense>
  );
}
