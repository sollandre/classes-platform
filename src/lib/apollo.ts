import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(import.meta.env.VITE_GRAPHCMS_URI)

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHCMS_URI,
  cache: new InMemoryCache()
})