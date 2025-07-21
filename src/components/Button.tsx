import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) => (
  <button
    className={styles.button}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
