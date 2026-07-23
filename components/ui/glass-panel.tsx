import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "glass-panel",
        interactive && "transition-transform duration-300 hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}
