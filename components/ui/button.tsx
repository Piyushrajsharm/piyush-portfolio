"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring group/button inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-[8px] px-4 text-sm font-medium transition-[transform,border-color,background-color,box-shadow,color] duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "border border-white/15 bg-white text-black shadow-glow hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(100,218,255,.34)]",
        secondary:
          "border border-white/15 bg-white/[0.08] text-white backdrop-blur-2xl hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-white/[0.14]",
        ghost: "border border-transparent bg-transparent text-muted-foreground hover:bg-white/[0.08] hover:text-foreground",
        outline:
          "border border-white/15 bg-transparent text-foreground hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-white/[0.08]",
        icon: "h-11 w-11 border border-white/15 bg-white/[0.08] p-0 text-foreground hover:border-cyan-200/40 hover:bg-white/[0.14]"
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5 text-base",
        icon: "h-10 w-10 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
