import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import index from "./store";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={index}>
    <App />
  </Provider>,
  document.getElementById("root")
);
