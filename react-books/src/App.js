import React from "react";
import Header from "./components/Header";
import {BrowserRouter} from "react-router-dom";
import Routes from "./router/Routes";
import CurrentUserChecker from "./components/CurrentUserChecker";
import RootContainer from "./components/RootContainer";

const App = () => {
  return (
    <CurrentUserChecker>
      <BrowserRouter>
        <Header/>
        <RootContainer>
          <Routes/>
        </RootContainer>
      </BrowserRouter>
    </CurrentUserChecker>
  );
}

export default App;