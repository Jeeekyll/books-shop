import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Logout from "../pages/Auth/Logout";
import { Header as LayoutHeader } from "antd/lib/layout/layout";
import Menu from "antd/lib/menu";

const Header = () => {
  const { email, isLoggedIn } = useSelector(
    ({ user }) => ({
      email: user.user.email,
      isLoggedIn: user.isLoggedIn,
    }),
    shallowEqual
  );

  return (
    <LayoutHeader>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys="1">
        <Menu.Item>
          <Menu.Item key="0">
            <Link to="/">Books shop</Link>
          </Menu.Item>
        </Menu.Item>

        <Menu.Item key="1" style={{ marginLeft: "auto" }}>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </Menu.Item>

        {isLoggedIn ? (
          <>
            <Menu.Item key="2">
              <Link to="/user">{email}</Link>
            </Menu.Item>
            <Menu.Item key="3" danger={true}>
              <Logout />
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="2">
              <NavLink to="/register">Register</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </LayoutHeader>
  );
};

export default memo(Header);
