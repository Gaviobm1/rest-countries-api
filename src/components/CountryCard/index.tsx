import styles from "./CountryCard.module.css";
import { Link } from "react-router-dom";

export interface CountryCardProps {
  name: {
    common: string;
  };
  cca3: string;
  population: number;
  region: string;
  capital?: string[];
  flags: {
    svg: string;
  };
}

export default function CountryCard({
  name,
  cca3,
  population,
  region,
  capital = [],
  flags,
}: CountryCardProps) {
  return (
    <div className={styles.wrapper}>
      <Link
        to={`/${cca3}`}
        className={styles.link}
        aria-label={`View details about ${name.common}`}
      >
        <img
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{name.common}</h3>
          <p>
            <strong>Population:</strong> {population.toLocaleString()}
          </p>
          <p>
            <strong>Region:</strong> {region}
          </p>
          <p>
            <strong>Capital:</strong> {capital.length > 0 ? capital[0] : "N/A"}
          </p>
        </div>
      </Link>
    </div>
  );
}
