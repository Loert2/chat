import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./RootReducer";

import "./assets/css/index.css";
import "./assets/css/main.css";
import "./assets/css/auth.css";
import App from "./App";

const store = createStore(rootReducer);

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
