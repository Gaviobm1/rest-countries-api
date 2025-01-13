import styles from "./CountryCard.module.css";

export interface CountryCardProps {
  name: string;
  alpha3Code: string;
  population: number;
  region: string;
  capital: string | undefined;
  flag: string;
}

export default function CountryCard(countryData: CountryCardProps) {
  const { name, alpha3Code, population, region, capital, flag } = countryData;

  return (
    <div className={styles.wrapper}>
      <a href={`/${alpha3Code}`}>
        <img src={flag} className={styles.image} />
        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>
          <p>Population: {population}</p>
          <p>Region: {region}</p>
          <p>Capital: {capital}</p>
        </div>
      </a>
    </div>
  );
}
