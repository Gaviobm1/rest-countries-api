import Header from "../Header";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./DetailPage.module.css";
import Button from "../Button";
import { ArrowLeft } from "lucide-react";
import data from "../../../data/data.json";

interface CurrencyType {
  code: string;
  name: string;
  symbol: string;
}

interface LanguageType {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface DetailPageProps {
  country: {
    name: string;
    nativeName: string;
    flags: { svg: string; png: string };
    population: number;
    borders: string[];
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string;
    currencies: CurrencyType[];
    languages: LanguageType[];
    borderCountries: string[];
  };
}

interface BorderType {
  name: string;
  alpha3Code: string;
}

export default function DetailPage({ country }: DetailPageProps) {
  const {
    name,
    nativeName,
    flags,
    population,
    borders,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
  } = country;

  function getBorderCountries(): BorderType[] {
    if (!borders) {
      return [];
    }
    return borders
      .map((border) => {
        const country = data.find((country) => country.alpha3Code === border);
        return country
          ? { name: country.name, alpha3Code: country.alpha3Code }
          : null;
      })
      .filter((border): border is BorderType => border !== null);
  }

  const borderCountries = getBorderCountries();

  return (
    <LayoutWrapper>
      <Header>Where in the world?</Header>
      <main className={styles.wrapper}>
        <a href="/">
          <Button>
            <ArrowLeft /> Back
          </Button>
        </a>
        <div className={styles.infoWrapper}>
          <div className={styles.image}>
            <img src={flags.svg} alt={`flag of ${name}`} />
          </div>
          <div className={styles.infoContainer}>
            <h1>{name}</h1>
            <section className={styles.info}>
              <p>
                <span className={styles.infoTag}>Native name: </span>{" "}
                {nativeName}
              </p>
              <p>
                <span className={styles.infoTag}>Population: </span>{" "}
                {population}
              </p>
              <p>
                <span className={styles.infoTag}>Region: </span> {region}
              </p>
              <p>
                <span className={styles.infoTag}>Sub Region: </span> {subregion}
              </p>
              <p>
                <span className={styles.infoTag}>Capital: </span> {capital}
              </p>
              <p>
                <span className={styles.infoTag}>Top Level Domain: </span>{" "}
                {topLevelDomain}
              </p>
              <p>
                <span className={styles.infoTag}>Currencies: </span>{" "}
                {currencies.map((currency, index) => {
                  if (index < currencies.length - 1) {
                    return `${currency.name}, `;
                  }
                  return currency.name;
                })}
              </p>
              <p>
                <span className={styles.infoTag}>Languages: </span>{" "}
                {languages.map((language, index) => {
                  if (index < languages.length - 1) {
                    return `${language.name}, `;
                  }
                  return language.name;
                })}
              </p>
            </section>
            {borders && (
              <div className={styles.borderButtons}>
                <p>
                  <span className={styles.infoTag}>Borders: </span>{" "}
                  {borderCountries.map((border) => (
                    <a href={`/${border.alpha3Code}`} key={border.alpha3Code}>
                      <Button
                        style={{
                          display: "inline",
                          padding: "0.5rem 0.675rem",
                          fontSize: "0.875rem",
                          whiteSpace: "nowrap",
                          marginRight: "0.875rem",
                          marginBottom: "0.875rem",
                        }}
                      >
                        {border.name}
                      </Button>
                    </a>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </LayoutWrapper>
  );
}
