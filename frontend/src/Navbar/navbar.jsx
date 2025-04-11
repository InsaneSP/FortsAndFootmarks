import React from "react";
import logo from "../images/NewLogo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext.js";
import "./navbarstyles.css";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid navbar-container">

                {/* Logo */}
                <a className="navbar-brand" href="#">
                    <img src={logo} style={{ maxHeight: "125px", width: "125px" }} alt="Logo" />
                </a>

                {/* Mobile - Profile or Login + hamburger */}
                <div className="navbar-icons-container d-lg-none ms-auto">
                    {!user && (
                        <div className="d-lg-none">
                            <Link className="nav-link cta" to="/login">Login</Link>
                        </div>
                    )}

                    {user && (
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle p-0 border-0 bg-transparent"
                                type="button"
                                id="profileDropdownMobile"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={user.photoURL} className="profile-picture" alt="Profile" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdownMobile">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
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
                </div>

                {/* Nav Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/plan">Plan a Trek</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/forts">Forts</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/aboutus">About</Link></li>
                    </ul>

                    {/* Desktop Login */}
                    {!user && (
                        <div className="d-none d-lg-block">
                            <Link className="nav-link cta" to="/login">Login</Link>
                        </div>
                    )}

                    {/* Desktop Profile */}
                    {user && (
                        <div className="dropdown d-none d-lg-block">
                            <button
                                className="btn dropdown-toggle p-0 border-0 bg-transparent"
                                type="button"
                                id="profileDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={user.photoURL} className="profile-picture" alt="Profile" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
