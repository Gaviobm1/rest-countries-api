import React from "react";
import styles from "./Select.module.css";
import { ChevronDown } from "lucide-react";
interface SelectProps {
  options: string[];
  placeholder?: string;
  handleChange: (value: string) => void;
}

export default function Select({
  options,
  placeholder,
  handleChange,
}: SelectProps) {
  const [value, setValue] = React.useState<string>("");

  return (
    <span className={styles.wrapper}>
      <select
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
        className={styles.select}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className={styles.icon} />
    </span>
  );
}
