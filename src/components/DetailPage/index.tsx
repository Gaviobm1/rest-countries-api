import { useEffect, useState } from "react";
import Header from "../Header";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./DetailPage.module.css";
import Button from "../Button";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Country } from "../../types";

interface BorderType {
  name: {
    common: string;
  };
  cca3: string;
}

export default function DetailPage() {
  const { alpha3Code } = useParams<{ alpha3Code: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<
    { name: string; alpha3Code: string }[]
  >([]);

  useEffect(() => {
    async function fetchCountryDetails() {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${alpha3Code}`
        );
        const data = await response.json();
        const countryData = data[0];
        setCountry(countryData);

        if (countryData.borders) {
          const bordersResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}`
          );
          const bordersData = await bordersResponse.json();
          const borders = bordersData.map((border: BorderType) => ({
            name: border.name.common,
            alpha3Code: border.cca3,
          }));
          setBorderCountries(borders);
        }
      } catch (error) {
        console.error("Failed to fetch country details:", error);
      }
    }

    fetchCountryDetails();
  }, [alpha3Code]);

  if (!country) {
    return (
      <LayoutWrapper>
        <Header>Where in the world?</Header>
        <main className={styles.wrapper}>
          <p>Loading...</p>
        </main>
      </LayoutWrapper>
    );
  }

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
  } = country;

  return (
    <main className={styles.wrapper}>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft /> Back
      </Button>
      <div className={styles.infoWrapper}>
        <img
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          className={styles.image}
        />
        <div className={styles.infoContainer}>
          <h1>{name.common}</h1>
          <section className={styles.info}>
            <p>
              <span className={styles.infoTag}>Native name:</span>{" "}
              {Object.values(name.nativeName || {})
                .map((native) => native.official)
                .join(", ")}
            </p>
            <p>
              <span className={styles.infoTag}>Population:</span>{" "}
              {population.toLocaleString()}
            </p>
            <p>
              <span className={styles.infoTag}>Region:</span> {region}
            </p>
            {subregion && (
              <p>
                <span className={styles.infoTag}>Sub Region:</span> {subregion}
              </p>
            )}
            <p>
              <span className={styles.infoTag}>Capital:</span>{" "}
              {capital?.join(", ") || "N/A"}
            </p>
            <p>
              <span className={styles.infoTag}>Top Level Domain:</span>{" "}
              {tld?.join(", ")}
            </p>
            <p>
              <span className={styles.infoTag}>Currencies:</span>{" "}
              {Object.values(currencies || {})
                .map((currency) => currency.name)
                .join(", ")}
            </p>
            <p>
              <span className={styles.infoTag}>Languages:</span>{" "}
              {Object.values(languages || {}).join(", ")}
            </p>
          </section>
          {borderCountries.length > 0 && (
            <div className={styles.borderButtons}>
              <p>
                <span className={styles.infoTag}>Borders:</span>{" "}
                {borderCountries.map((border) => (
                  <Link
                    to={`/${border.alpha3Code}`}
                    key={border.alpha3Code}
                    className={styles.borderLink}
                  >
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
                  </Link>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
