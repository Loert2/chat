import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from "./store/reducers";

import { default as thunk } from "redux-thunk";

import "./assets/css/index.css";
import "./assets/css/main.css";
import "./assets/css/auth.css";
import App from "./App";

const middleware = [thunk, logger];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
