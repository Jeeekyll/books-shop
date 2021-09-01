import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router/Routes";
import CurrentUserChecker from "./components/CurrentUserChecker";
import RootContainer from "./components/RootContainer";
import { Layout } from "antd";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  return (
    <CurrentUserChecker>
      <BrowserRouter>
        <Layout>
          <Header />
          <RootContainer>
            <Routes />
          </RootContainer>
        </Layout>
      </BrowserRouter>
    </CurrentUserChecker>
  );
};

export default App;
