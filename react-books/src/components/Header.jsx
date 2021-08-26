import React from "react";
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Logout from "../pages/Auth/Logout";

const Header = () => {
  const {user, isLoggedIn, isLoading} = useSelector(({user}) => ({
    user: user.user,
    isLoggedIn: user.user.isLoggedIn,
    isLoading: user?.isLoading,
  }));

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
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            {isLoading ?
              <li className="nav-item">
                <div className="nav-link">Loading...</div>
              </li>
              :
              <>
                {
                  isLoggedIn ?
                    <>
                      <a href="/" className="nav-link">{user && user.email}</a>
                      <Logout/>
                    </>
                    :
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
                }
              </>
            }
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;