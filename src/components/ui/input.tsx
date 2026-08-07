import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[var(--radius-sm)] border border-border-strong bg-black px-3 py-2",
          "font-mono text-sm text-fg placeholder:text-fg-faint",
          "transition-[border-color,box-shadow,background-color] duration-[var(--duration-fast)]",
          "hover:border-border-halo focus-visible:border-green focus-visible:outline-none",
          "focus-visible:shadow-[0_0_0_1px_var(--color-green)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "accent-green",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
