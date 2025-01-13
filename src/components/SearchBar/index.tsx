import styles from "./SearchBar.module.css";
import { LucideIcon } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  Icon: LucideIcon;
  term: string;
  handleSearch: (term: string) => void;
}

export default function SearchBar({
  placeholder,
  Icon,
  term,
  handleSearch,
}: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <Icon className={styles.icon} />
      <input
        type="text"
        value={term}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
}
