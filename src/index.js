import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { store } from "./components/redux/store";
import ApolloProvider from "./components/apollo/apollo-provider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider></ApolloProvider>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
