import React from "react";
import Text from "./Text";
import styles from "./InputField.module.css";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name: string;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  error,
  name,
}: InputFieldProps) => (
  <>
    <Text variant="label" className={styles.label}>
      {label}
    </Text>
    <input
      className={styles.input}
      id={name}
      type={type}
      autoComplete={type === "password" ? "current-password" : "on"}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && (
      <Text variant="error" className={styles.error}>
        {error}
      </Text>
    )}
  </>
);

export default InputField;
