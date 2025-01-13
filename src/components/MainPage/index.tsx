import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar";
import Select from "../Select";
import CountryCardGrid from "../CountryCardGrid";
import Header from "../Header";
import LayoutWrapper from "../LayoutWrapper";
import data from "../../../data/data.json";
import { Search } from "lucide-react";

export default function MainPage() {
  const [countries, setCountries] = React.useState(data);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [region, setRegion] = React.useState("");
  const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  function filterByRegion(region: string) {
    if (region === "All") {
      setRegion(region);
      setCountries(data);
      return;
    }
    const filteredCountries = data.filter(
      (country) =>
        country.region === region &&
        (country.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          searchTerm === "")
    );
    setRegion(region);
    setCountries(filteredCountries);
  }

  function searchCountry(searchTerm: string) {
    const filteredCountries = data.filter(
      (country) =>
        country.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
        (country.region === region || region === "All" || region === "")
    );
    setSearchTerm(searchTerm);
    setCountries(filteredCountries);
  }

  return (
    <LayoutWrapper>
      <Header>Where in the world?</Header>
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
    </LayoutWrapper>
  );
}

const SearchFilterWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  @media (max-width: 550px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
