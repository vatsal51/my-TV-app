import React from "react";
import CardLayoutClient from "./CardLayoutClient";

const CardLayout = ({ state, href, type }) => {
  return <CardLayoutClient state={state} href={href} type={type} />;
};

export default CardLayout;
