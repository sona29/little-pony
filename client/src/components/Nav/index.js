import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import unicorn from "../../assets/unicorn.png";
import { BsPersonPlus } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";
import "./style.css";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item px-1">
            <Link to="/dashBoard">DashBoard</Link>
          </li>
          <li className="nav-item px-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="nav-item px-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item px-2 access">
            <Link to="/signup">
              <BsPersonPlus /> Register
            </Link>
          </li>
          <li className="nav-item access">
            <Link to="/login">
              <BsPersonCheck /> Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <Link to="/">
        <img src={unicorn} alt="..." height="70" className="logo pt-1 pb-1" />
        <span className="web-name">Little Pony</span>
      </Link>

      <nav className="navbar navbar-expand-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-a" id="navbarNav">
          {showNavigation()}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
