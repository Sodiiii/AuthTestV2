import React from "react";
import { FC } from "react";
import Navbar from "../components/Navbar";
import Home from "./Home";

const Main: FC = () => {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default Main;
