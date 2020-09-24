import React from "react";
import { MockedProvider, MockLink } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import CountrySelect, { LIST_COUNTRIES } from ".";

const getMockedComponent = () => {
  const mocks = [
    {
      request: {
        query: LIST_COUNTRIES,
      },
      result: {
        data: {
          countries: [
            {
              name: "Andorra",
              __typename: "Country",
              code: "AD",
            },
            {
              name: "United Arab Emirates",
              __typename: "Country",
              code: "AE",
            },
            {
              name: "Afghanistan",
              __typename: "Country",
              code: "AF",
            },
          ],
        },
      },
    },
  ];

  // MockLink required to restore AC2 behavior
  const mockLink = new MockLink(mocks, true);
  mockLink.setOnError((errors) => {
    const { graphQLErrors, networkError } = errors;
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.error(`[Network error]: ${networkError}`);

    if (errors) {
      console.error(errors);
    }
  });

  // To view workaround for this issue, pass the `mockLink` created above to the `MockedProvider` as the link prop (`link={mockLink}`):
  return (
    <MockedProvider mocks={mocks}>
      <CountrySelect />
    </MockedProvider>
  );
};

describe("Country Select", () => {
  it("finishes loading", async () => {
    const { findByText } = render(getMockedComponent());
    expect(await findByText("Andorra")).toBeTruthy();
  });
});
