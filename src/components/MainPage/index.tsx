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
  const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  function filterByRegion(region: string) {
    const filteredCountries = data.filter(
      (country) => country.region === region
    );
    setCountries(filteredCountries);
  }

  return (
    <LayoutWrapper>
      <Header>Where in the world?</Header>
      <SearchFilterWrapper>
        <SearchBar placeholder="Search for a country..." Icon={Search} />
        <Select
          options={REGIONS}
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
