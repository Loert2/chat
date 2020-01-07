import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./RootReducer";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import "./assets/css/index.css";
import "./assets/css/main.css";
import "./assets/css/auth.css";
import App from "./App";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8900", credentials: "include" }),
  cache: new InMemoryCache()
});

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
