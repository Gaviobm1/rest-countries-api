import React from "react";
import DarkModeButton from "../DarkModeButton";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={styles.wrapper}>
      <Link to="/">
        <h1 className={styles.header}>{children}</h1>
      </Link>
      <DarkModeButton />
    </header>
  );
}
