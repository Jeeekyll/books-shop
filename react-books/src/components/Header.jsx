import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Logout from "../pages/Auth/Logout";

const Header = () => {
  const { email, isLoggedIn } = useSelector(
    ({ user }) => ({
      email: user.user.email,
      isLoggedIn: user.isLoggedIn,
    }),
    shallowEqual
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Books shop
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    {email}
                  </Link>
                </li>
                <li className="nav-item">
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default memo(Header);
