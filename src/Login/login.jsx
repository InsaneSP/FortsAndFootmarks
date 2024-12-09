import React, { Component } from "react";
import log from "../images/log.png";
import register from "../images/register.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUpMode: false,
            formData: {
                username: "",
                email: "",
                password: "",
            },
            error: "",
            success: "",
        };
    }

    toggleSignUpMode = () => {
        this.setState((prevState) => ({
            isSignUpMode: !prevState.isSignUpMode,
            error: "",
            success: "",
        }));
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { isSignUpMode, formData } = this.state;

        try {
            const endpoint = isSignUpMode
                ? "http://localhost:3001/auth/register"
                : "http://localhost:3001/auth/login";

            const response = await axios.post(endpoint, formData);

            if (isSignUpMode) {
                this.setState({ success: response.data.message, error: "" });
            } else {
                localStorage.setItem("token", response.data.token); // Save the token in localStorage
                this.setState({ success: "Login successful!", error: "" });
                // Redirect or reload after login
                window.location.href = "/"; // Change this to your desired route
            }
        } catch (error) {
            this.setState({
                error: error.response?.data?.message || "An error occurred",
                success: "",
            });
        }
    };

    render() {
        const { isSignUpMode, formData, error, success } = this.state;

        return (
            <div className="login-body">
                <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
                    <div className="forms-container">
                        <div className="signin-signup">
                            {/* Sign In Form */}
                            <form
                                onSubmit={this.handleSubmit}
                                className="sign-in-form login-form"
                            >
                                <h2 className="title">Sign in</h2>
                                {error && <p className="error-text">{error}</p>}
                                {success && <p className="success-text">{success}</p>}
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faUser} className="icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={this.handleChange}
                                        className="inp"
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faLock} className="icon" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={this.handleChange}
                                        className="inp"
                                        required
                                    />
                                </div>
                                <input type="submit" value="Login" className="login-btn solid inp" />
                            </form>

                            {/* Sign Up Form */}
                            <form
                                onSubmit={this.handleSubmit}
                                className="sign-up-form login-form"
                            >
                                <h2 className="title">Sign up</h2>
                                {error && <p className="error-text">{error}</p>}
                                {success && <p className="success-text">{success}</p>}
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faUser} className="icon" />
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={this.handleChange}
                                        className="inp"
                                        required={isSignUpMode}
                                    />
                                </div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={this.handleChange}
                                        className="inp"
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faLock} className="icon" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={this.handleChange}
                                        className="inp"
                                        required
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Sign up"
                                    className="login-btn inp"
                                />
                            </form>
                        </div>
                    </div>

                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>New to Our Trekking Community? Join Us!</h3>
                                <p>
                                    Sign up to start your journey through the historical forts of
                                    Chhatrapati Shivaji Maharaj.
                                </p>
                                <button
                                    className="login-btn transparent"
                                    onClick={this.toggleSignUpMode}
                                >
                                    Sign up
                                </button>
                            </div>
                            <img src={log} className="image" alt="" />
                        </div>
                        <div className="panel right-panel">
                            <div className="content">
                                <h3>Already a Trekker? Sign In to Continue!</h3>
                                <p>
                                    Log in to continue exploring the majestic forts of
                                    Chhatrapati Shivaji Maharaj.
                                </p>
                                <button
                                    className="login-btn transparent"
                                    onClick={this.toggleSignUpMode}
                                >
                                    Sign in
                                </button>
                            </div>
                            <img src={register} className="image" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
