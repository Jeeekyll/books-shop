import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    dispatch(logout());
  };

  return <div onClick={() => handleSubmit()}>Logout</div>;
};

export default Logout;
