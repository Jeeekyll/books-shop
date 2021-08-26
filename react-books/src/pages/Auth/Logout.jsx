import React from "react";
import {logoutUser} from "../../store/user";
import {useDispatch} from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";

const Logout = () => {
  const dispatch = useDispatch();
  const [token] = useLocalStorage('token');
  const handleSubmit = async () => {
    dispatch(logoutUser(token));
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => handleSubmit()}>
      Logout
    </button>
  );
}

export default Logout;