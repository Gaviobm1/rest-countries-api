import { CountryCardProps } from "../CountryCard";
import CountryCard from "../CountryCard";
import styles from "./CountryCardGrid.module.css";

interface CountryCardGridProps {
  countries: CountryCardProps[];
}

export default function CountryCardGrid({ countries }: CountryCardGridProps) {
  return (
    <main className={styles.wrapper}>
      {countries.map((country) => (
        <CountryCard {...country} />
      ))}
    </main>
  );
}
