import React from "react";
import styles from "./SearchBar.module.css";
import { LucideIcon } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  Icon: LucideIcon;
}

export default function SearchBar({ placeholder, Icon }: SearchBarProps) {
  const [term, setTerm] = React.useState("");

  return (
    <div className={styles.wrapper}>
      <Icon className={styles.icon} />
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
}
