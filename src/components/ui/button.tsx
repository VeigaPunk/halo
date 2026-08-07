import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Horizon Halo console buttons — black + green border, solid green primary */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-mono text-sm font-medium tracking-wide",
    "transition-[background-color,border-color,color,box-shadow,opacity]",
    "duration-[var(--duration-fast)]",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green",
    "disabled:pointer-events-none disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-green text-accent-fg border border-green hover:bg-[color-mix(in_srgb,var(--color-green)_85%,#000)] shadow-[0_0_18px_color-mix(in_srgb,var(--color-green)_25%,transparent)]",
        secondary:
          "bg-black text-green border border-green hover:bg-[color-mix(in_srgb,var(--color-green)_13%,transparent)]",
        ghost:
          "bg-transparent text-fg-muted border border-transparent hover:text-green hover:bg-bg-subtle",
        outline:
          "bg-black text-green border border-green hover:bg-[color-mix(in_srgb,var(--color-green)_13%,transparent)]",
        link: "bg-transparent text-green underline-offset-4 hover:underline px-0 h-auto border-0",
      },
      size: {
        sm: "h-8 px-3 rounded-[var(--radius-sm)] text-xs",
        md: "h-10 px-4 rounded-[var(--radius-sm)]",
        lg: "h-11 px-5 rounded-[var(--radius-md)] text-base",
        icon: "size-10 rounded-[var(--radius-sm)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
