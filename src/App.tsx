import React, { FC } from "react";
import "./App.css";
import Login from "./pages/Login";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Main from "./pages/Main";

const App: FC = () => {
  const user = useSelector(selectUser);

  return <div>{user ? <Main /> : <Login />}</div>;
};

export default App;
