import { Suspense } from "react";
import { UnifiedAuth } from "@/components/auth/unified-auth";

export const metadata = {
  title: "Sign In | NexioraEV",
  description: "Sign in to your NexioraEV account.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[430px] mx-auto bg-[#121824] rounded-3xl p-8 h-[480px] flex items-center justify-center border border-white/[0.08]">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UnifiedAuth initialMode="login" />
    </Suspense>
  );
}
