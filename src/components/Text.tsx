import React from "react";
import styles from "./Text.module.css";

export type TextVariant = "heading" | "body" | "label" | "error" | "link";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
}

const Text = ({ children, variant = "body", className = "" }: TextProps) => (
  <span className={`${styles[variant]} ${className}`.trim()}>{children}</span>
);

export default Text;
