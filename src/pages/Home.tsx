import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../redux/modules/auth";
import { RootState } from "../types";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector<RootState, string | null>((state) => state.auth.token);

  if (token === null) {
    return <Redirect to="/signin" />;
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={handleLogoutClick}></button>
    </div>
  );
}
