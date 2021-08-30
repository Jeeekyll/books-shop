import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchUser } from "../store/userSlice";

const CurrentUserChecker = ({ children }) => {
  const dispatch = useDispatch();
  const [token] = useLocalStorage("token");

  useEffect(() => {
    dispatch(fetchUser(token));
  }, []);

  return children;
};

export default CurrentUserChecker;
