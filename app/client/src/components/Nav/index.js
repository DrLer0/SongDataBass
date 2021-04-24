import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand bg-success rounded" href="/">
        Song DataBass
      </a>
      <a className="navbar-brand bg-warning rounded" href="/artist">
        Artists
      </a>
    </nav>
  );
}

export default Nav;
