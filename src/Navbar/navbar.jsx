import React, { Component } from "react";
import logo from "../images/NewLogo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext.js";
import "./navbarstyles.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-fixed">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} style={{ maxHeight: "150px", width: "150px" }} alt="Logo" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/plan">
                                Plan a Trek
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/forts">
                                Forts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/aboutus">
                                About
                            </Link>
                        </li>
                        {!user ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="profile-picture"
                                            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                                        />
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <button className="dropdown-item" onClick={logout}>Logout</button>
                                        </li>
                                    </ul>
                                </li>

                                {/* <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#"
                                        onClick={logout}
                                    >
                                        Logout
                                    </a>
                                </li> */}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
