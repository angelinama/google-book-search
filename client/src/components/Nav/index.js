import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google books
      </a>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/saved" className="nav-link">
              Saved
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
