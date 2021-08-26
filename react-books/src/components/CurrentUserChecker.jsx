import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";
import {fetchUser} from "../store/user";
import Header from "./Header";

const CurrentUserChecker = ({children}) => {
  const {isLoading} = useSelector(({user}) => ({isLoading: user.isLoading}));

  const dispatch = useDispatch();
  const [token] = useLocalStorage('token');

  useEffect(() => {
    dispatch(fetchUser(token));
  }, []);

  return  isLoading ? <Header>Loading...</Header> : children;
}

export default CurrentUserChecker;