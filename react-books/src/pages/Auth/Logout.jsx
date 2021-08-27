import React from "react";
import {logoutUser} from "../../store/reducers/user";
import {useDispatch} from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";

const Logout = () => {
  const dispatch = useDispatch();
  const [token] = useLocalStorage('token');

  const handleSubmit = async () => {
    dispatch(logoutUser(token));
  };

  return (
    <div
      role="button"
      className="nav-link text-danger"
      onClick={() => handleSubmit()}>
      Logout
    </div>
  );
}

export default Logout;