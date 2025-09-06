"use client";

import { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "featured" | "minimal" | "gradient";
  onClick?: () => void;
  interactive?: boolean;
}

// Main Bento Grid Container
export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

BentoGrid.displayName = "BentoGrid";

// Bento Card Component
export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      children,
      className,
      size = "md",
      variant = "default",
      onClick,
      interactive = true,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "col-span-1 row-span-1",
      md: "col-span-1 md:col-span-2 row-span-1",
      lg: "col-span-1 md:col-span-2 lg:col-span-3 row-span-2",
      xl: "col-span-1 md:col-span-2 lg:col-span-4 row-span-2",
    };

    const variantClasses = {
      default: "card-modern",
      featured:
        "glass-medium border-accent-blue/20 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5",
      minimal: "glass-light border-border",
      gradient:
        "bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-orange/10 border-accent-blue/20",
    };

    const MotionDiv = motion.div;

    return (
      <MotionDiv
        ref={ref}
        className={cn(
          "relative overflow-hidden group",
          sizeClasses[size],
          variantClasses[variant],
          interactive && "cursor-pointer",
          className,
        )}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={
          interactive
            ? {
                scale: 1.02,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        whileTap={
          interactive
            ? {
                scale: 0.98,
                transition: { duration: 0.1 },
              }
            : undefined
        }
        {...props}
      >
        {children}

        {/* Hover Effect Overlay */}
        {interactive && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </MotionDiv>
    );
  },
);

BentoCard.displayName = "BentoCard";

// Pre-built Bento Components

interface FeatureBentoProps {
  icon: ReactNode;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
  size?: BentoCardProps["size"];
  variant?: BentoCardProps["variant"];
}

export const FeatureBento = ({
  icon,
  title,
  description,
  stats,
  size = "md",
  variant = "default",
}: FeatureBentoProps) => {
  return (
    <BentoCard size={size} variant={variant}>
      <div className="h-full flex flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {title}
            </h3>
            <p className="text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>

        {stats && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-accent-blue">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BentoCard>
  );
};

interface MetricBentoProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  size?: BentoCardProps["size"];
}

export const MetricBento = ({
  label,
  value,
  change,
  trend = "neutral",
  size = "sm",
}: MetricBentoProps) => {
  const trendColors = {
    up: "text-accent-green",
    down: "text-accent-red",
    neutral: "text-text-muted",
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <BentoCard size={size} variant="minimal">
      <div className="h-full flex flex-col justify-center p-6 text-center">
        <div className="text-3xl font-bold text-text-primary mb-2">{value}</div>
        <div className="text-sm text-text-secondary mb-2">{label}</div>
        {change && (
          <div
            className={cn(
              "text-xs flex items-center justify-center",
              trendColors[trend],
            )}
          >
            <span className="mr-1">{trendIcons[trend]}</span>
            {change}
          </div>
        )}
      </div>
    </BentoCard>
  );
};

interface PersonaBentoProps {
  emoji: string;
  name: string;
  description: string;
  specialties: string[];
  active?: boolean;
  size?: BentoCardProps["size"];
}

export const PersonaBento = ({
  emoji,
  name,
  description,
  specialties,
  active = false,
  size = "md",
}: PersonaBentoProps) => {
  return (
    <BentoCard size={size} variant={active ? "featured" : "default"}>
      <div className="h-full p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{emoji}</div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
            {active && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                <span className="text-xs text-accent-green">Active</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-background-tertiary border border-border rounded-lg text-xs text-text-muted"
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 3 && (
            <span className="px-2 py-1 bg-background-tertiary border border-border rounded-lg text-xs text-text-muted">
              +{specialties.length - 3} more
            </span>
          )}
        </div>
      </div>
    </BentoCard>
  );
};

interface ImageBentoProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  size?: BentoCardProps["size"];
  overlay?: boolean;
}

export const ImageBento = ({
  src,
  alt,
  title,
  description,
  size = "md",
  overlay = true,
}: ImageBentoProps) => {
  return (
    <BentoCard size={size} variant="minimal" className="p-0 overflow-hidden">
      <div className="relative h-full">
        <img src={src} alt={alt} className="w-full h-full object-cover" />

        {overlay && (title || description) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
            <div className="p-6 text-white">
              {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
              {description && (
                <p className="text-sm opacity-90">{description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </BentoCard>
  );
};

interface ActionBentoProps {
  icon: ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  size?: BentoCardProps["size"];
  variant?: BentoCardProps["variant"];
}

export const ActionBento = ({
  icon,
  title,
  description,
  action,
  onClick,
  size = "md",
  variant = "gradient",
}: ActionBentoProps) => {
  return (
    <BentoCard
      size={size}
      variant={variant}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="h-full flex flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {title}
            </h3>
            <p className="text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="inline-flex items-center text-accent-blue group-hover:text-accent-purple transition-colors font-medium">
            {action}
            <motion.span
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
