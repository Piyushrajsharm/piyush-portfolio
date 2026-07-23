import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "focus-ring min-h-32 w-full resize-none rounded-[8px] border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-foreground shadow-glass-inset transition-colors placeholder:text-muted-foreground hover:border-white/25 focus:border-cyan-200/50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
