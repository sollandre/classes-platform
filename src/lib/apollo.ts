import { ApolloClient, InMemoryCache } from "@apollo/client";


export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHCMS_URI,
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_GRAPHCMS_SECRET}`
  },
  cache: new InMemoryCache()
})