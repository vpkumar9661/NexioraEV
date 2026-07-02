import { ReactNode } from "react";
import Link from "next/link";
import { APP_NAME } from "@nexiora/shared";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.92_0.06_162),transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              {/* Electric spark icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 2.5h3L11 22l2-2.5h-3L13 2z"/></svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">{APP_NAME || "Nexiora EV"}</span>
          </Link>
        </div>
        
        {children}
      </div>
    </div>
  );
}
