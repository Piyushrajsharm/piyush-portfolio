import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "focus-ring h-12 w-full rounded-[8px] border border-white/15 bg-white/[0.06] px-4 text-sm text-foreground shadow-glass-inset transition-colors placeholder:text-muted-foreground hover:border-white/25 focus:border-cyan-200/50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
