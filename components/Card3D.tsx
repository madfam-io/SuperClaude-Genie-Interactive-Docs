"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  perspective?: number;
  onClick?: () => void;
}

export function Card3D({
  children,
  className = "",
  intensity = 15,
  glowColor = "rgba(99, 102, 241, 0.3)",
  perspective = 1000,
  onClick,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [intensity, -intensity],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-intensity, intensity],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Main Card */}
        <motion.div
          className="relative w-full h-full rounded-xl overflow-hidden backdrop-blur-sm border border-white/10"
          style={{
            boxShadow: isHovered
              ? `0 20px 40px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.1)`
              : "0 4px 20px rgba(0,0,0,0.1)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
          animate={{
            boxShadow: isHovered
              ? `0 25px 50px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.2)`
              : "0 4px 20px rgba(0,0,0,0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0"
            animate={{
              opacity: isHovered ? 0.1 : 0,
              background: isHovered
                ? "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content with 3D offset */}
          <motion.div
            style={{
              transform: "translateZ(20px)",
            }}
            className="relative z-10 p-6 h-full"
          >
            {children}
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  transform: `translateZ(${10 + i * 10}px)`,
                }}
                animate={
                  isHovered
                    ? {
                        y: [-5, 5, -5],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${glowColor} 0%, transparent 50%, ${glowColor} 100%)`,
              opacity: 0,
              filter: "blur(1px)",
            }}
            animate={{
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Shadow */}
        <motion.div
          className="absolute inset-0 bg-black/20 rounded-xl"
          style={{
            transform: "translateZ(-10px) translateY(10px)",
            filter: "blur(20px)",
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
            transform: isHovered
              ? "translateZ(-10px) translateY(20px)"
              : "translateZ(-10px) translateY(10px)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
