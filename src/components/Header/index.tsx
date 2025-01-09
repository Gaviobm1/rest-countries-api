import React from "react";
import DarkModeButton from "../DarkModeButton";
import styles from "./Header.module.css";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.header}>{children}</h1>
      <DarkModeButton />
    </header>
  );
}
