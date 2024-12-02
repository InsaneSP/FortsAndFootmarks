import React, { Component } from "react";
import logo from "../images/Logo.png";
import { Link } from "react-router-dom";
import "./navbarstyles.css";
import { CAvatar } from "@coreui/react-pro";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

class Navbar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                                <Link className="nav-link" to="/">
                                    Categories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/aboutus">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            {/* Uncomment if you want to add a user profile avatar */}
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    <CAvatar color="light" size="lg">CUI</CAvatar>
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Navbar;
