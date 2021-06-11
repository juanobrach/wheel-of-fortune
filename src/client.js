import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    authorization: `Bearer fnAEKRfO0HACBlUk1obxZWxz_tCYCZyswWw3Xc9M`,
  },
  cache: new InMemoryCache(),
});
