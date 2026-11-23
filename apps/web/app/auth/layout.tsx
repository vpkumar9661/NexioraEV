import { ReactNode } from "react";

export const metadata = {
  title: "Authentication | NexioraEV",
  description: "Sign in or create your NexioraEV account with an interactive lamp-illuminated experience.",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden"
      style={{
        backgroundColor: "#080B11",
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 50% 105%, rgba(0, 0, 0, 0.8) 0%, transparent 70%)
        `,
      }}
    >
      {/* Main Authentication Container */}
      <main className="w-full relative z-10 flex items-center justify-center py-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
