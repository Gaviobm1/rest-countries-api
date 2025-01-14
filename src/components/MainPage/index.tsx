import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar";
import Select from "../Select";
import CountryCardGrid from "../CountryCardGrid";
import { Search } from "lucide-react";
import useSWR from "swr";
import { Country } from "../../types";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export default function MainPage() {
  const { data, error, isLoading } = useSWR(
    "https://restcountries.com/v3.1/all",
    fetcher
  );

  const [countries, setCountries] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [region, setRegion] = React.useState("All");

  const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  React.useEffect(() => {
    if (data && !isLoading) {
      setCountries(data);
    }
  }, [data, isLoading]);

  function filterByRegion(region: string) {
    setRegion(region);

    if (!data) return;

    const filteredCountries =
      region === "All"
        ? data
        : data.filter((country: Country) => country.region === region);

    if (searchTerm) {
      setCountries(
        filteredCountries.filter((country: Country) =>
          country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    } else {
      setCountries(filteredCountries);
    }
  }

  function searchCountry(term: string) {
    setSearchTerm(term);

    if (!data) return;

    const filteredCountries = data.filter((country: Country) =>
      country.name.common.toLowerCase().startsWith(term.toLowerCase())
    );

    if (region && region !== "All") {
      setCountries(
        filteredCountries.filter(
          (country: Country) => country.region === region
        )
      );
    } else {
      setCountries(filteredCountries);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading countries.</div>;

  return (
    <>
      <SearchFilterWrapper>
        <SearchBar
          placeholder="Search for a country..."
          Icon={Search}
          term={searchTerm}
          handleSearch={searchCountry}
        />
        <Select
          options={REGIONS}
          value={region}
          placeholder="Filter by Region"
          handleChange={filterByRegion}
        />
      </SearchFilterWrapper>
      <CountryCardGrid countries={countries} />
    </>
  );
}

const SearchFilterWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 550px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
