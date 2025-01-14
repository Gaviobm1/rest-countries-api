import styles from "./LayoutWrapper.module.css";
import Header from "../Header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <Header>Where in the world?</Header>
      {children}
    </div>
  );
}
