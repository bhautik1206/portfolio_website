"use client";

import * as React from "react";
import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  );
}
