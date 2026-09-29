import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass rounded-card p-6 transition-all duration-300 hover:border-aqua-400/30 glow-aqua-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
