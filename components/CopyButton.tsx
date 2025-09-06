"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`relative p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Copy to clipboard"
    >
      <motion.div
        initial={false}
        animate={{
          scale: copied ? 0 : 1,
          opacity: copied ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        📋
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: copied ? 1 : 0,
          opacity: copied ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        ✅
      </motion.div>
      <div className="w-4 h-4 opacity-0">📋</div>
    </motion.button>
  );
}
