import React from "react";
import "../Style/nav.scss";

const Nav = ({ children }) => {
  return <nav className="main__navigation">{children}</nav>;
};

export default Nav;
