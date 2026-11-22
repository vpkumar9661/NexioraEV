import { ReactNode } from "react";
import { AuthDecorations } from "@/components/auth/auth-decorations";

export const metadata = {
  title: "Authentication | NexioraEV",
  description: "Sign in or create your NexioraEV account to access electric mobility tools and ecosystem.",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      {/* Soft Ambient & Geometric Circular Background Decorations */}
      <AuthDecorations />

      {/* Main Authentication Container */}
      <main className="w-full relative z-10 flex items-center justify-center py-8">
        {children}
      </main>
    </div>
  );
}
