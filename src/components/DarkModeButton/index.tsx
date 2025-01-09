import React from "react";
import { Sun, Moon } from "lucide-react";
import RiseFallDiv from "../RiseFallDiv";
import styles from "./DarkModeButton.module.css";
import Cookies from "js-cookie";

export default function DarkModeButton() {
  const [isDark, setIsDark] = React.useState(() => {
    return Cookies.get("color-theme") || "light";
  });

  React.useEffect(() => {
    const theme = isDark === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    Cookies.set("color-theme", theme, { expires: 1000 });
  }, [isDark]);

  return (
    <button
      className={styles.btn}
      onClick={() => {
        setIsDark(() => {
          return isDark === "light" ? "dark" : "light";
        });
      }}
    >
      {isDark === "light" ? (
        <RiseFallDiv direction="rise">
          <Sun />
        </RiseFallDiv>
      ) : (
        <RiseFallDiv direction="fall">
          <Moon />
        </RiseFallDiv>
      )}
    </button>
  );
}
