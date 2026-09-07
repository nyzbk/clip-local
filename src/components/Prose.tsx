import type { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-clip max-w-3xl text-pretty leading-relaxed">
      {children}
    </div>
  );
}
