import React from "react";
import "../Style/nav.scss";

const Nav = ({ children }) => {
  return <nav className="navigation">{children}</nav>;
};

export default Nav;
