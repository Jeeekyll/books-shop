import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";
import {fetchUser} from "../store/user";

const CurrentUserChecker = ({children}) => {
  const dispatch = useDispatch();
  const [token] = useLocalStorage('token');

  useEffect(() => {
    dispatch(fetchUser(token));
    console.log('check')
  }, []);

  return  children;
}

export default CurrentUserChecker;