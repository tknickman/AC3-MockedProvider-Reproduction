import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import StateSelect from "../StateSelect";

// write a GraphQL query that asks for names and codes for all countries
export const LIST_COUNTRIES = gql`
  query allCountries {
    countries {
      name
      code
    }
  }
`;

// create a component that renders a select input for coutries
function CountrySelect() {
  const [country, setCountry] = useState("US");
  const { data, loading, error } = useQuery(LIST_COUNTRIES, {});

  if (error) {
    return <p>Could not load countries</p>;
  }

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <>
      <select
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      >
        {data.countries.map((country) => (
          <option key={country.name} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <div>{country && `Selected: ${country}`}</div>
      <StateSelect country={country} />
    </>
  );
}

export default CountrySelect;
