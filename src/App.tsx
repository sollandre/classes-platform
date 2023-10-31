import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { AuthContext, AuthContextProvider } from "./context/AuthContext"
import { client } from "./lib/apollo"
import { Router } from "./Router"

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
