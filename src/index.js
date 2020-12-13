import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Reset } from "styled-reset";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Reset />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
