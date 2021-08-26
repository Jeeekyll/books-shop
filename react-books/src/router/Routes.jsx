import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./RoutesList";
import {useSelector} from "react-redux";

const Routes = () => {
  const {isLoggedIn} = useSelector(({user}) => ({isLoggedIn: user.user.isLoggedIn}));

  return (

    isLoggedIn ?
      <Switch>
        {privateRoutes && privateRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        )}
        <Redirect to="/"/>
      </Switch>
      :
      <Switch>
        {publicRoutes && publicRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        )}
        <Redirect to="/login"/>
      </Switch>

  );
}

export default Routes;