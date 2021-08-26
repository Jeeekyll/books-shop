import React from "react";
import Header from "./components/Header";
import {BrowserRouter} from "react-router-dom";
import Routes from "./router/Routes";
import CurrentUserChecker from "./components/CurrentUserChecker";

const App = () => {
  return (
    <BrowserRouter>
      <CurrentUserChecker>
        <Header/>
        <Routes/>
      </CurrentUserChecker>
    </BrowserRouter>
  );
}

export default App;