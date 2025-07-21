import styles from "./Select.module.css";
import Text from "./Text";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  name: string;
}

const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  name,
}: SelectProps) => (
  <>
    <Text variant="label" className={styles.label}>
      {label}
    </Text>
    <select
      className={styles.select}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <Text variant="error" className={styles.error}>
        {error}
      </Text>
    )}
  </>
);

export default Select;
