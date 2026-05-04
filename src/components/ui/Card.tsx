import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface CardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
        className={cn(
          "glass-panel rounded-2xl p-6 relative overflow-hidden group",
          className
        )}
        {...props}
      >
        {hoverEffect && (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/10 to-[var(--color-neon-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        <div className="relative z-10">{children as ReactNode}</div>
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export { Card };
