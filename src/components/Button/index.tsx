import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...delegated }: ButtonProps) {
  return (
    <button className={styles.wrapper} {...delegated}>
      {children}
    </button>
  );
}
