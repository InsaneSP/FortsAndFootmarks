import React, { Component } from "react";
import log from "../images/log.png";
import register from "../images/register.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faGoogle,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import "./login.css";

class Login extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            isSignUpMode: false,
            formData: {
                username: "",
                email: "",
                password: "",
            },
            message: { text: "", type: "" },
            isLoading: false,
        };
    }

    toggleSignUpMode = () => {
        this.setState((prevState) => ({
            isSignUpMode: !prevState.isSignUpMode,
            message: { text: "", type: "" },
        }));
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { isSignUpMode, formData } = this.state;
        const { login } = this.context;

        // Validation
        if (!this.validateForm()) return;

        this.setState({ isLoading: true });

        try {
            const endpoint = `login`;  // Adjust the endpoint
            const response = await axios.post(endpoint, {
                ...formData,
            });

            if (isSignUpMode) {
                this.setState({
                    message: { text: response.data.message, type: "success" },
                    isLoading: false,
                });
            } else {
                login(response.data.token);
                this.setState({
                    message: { text: "Login successful!", type: "success" },
                    isLoading: false,
                });
                this.props.history.push("/");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong.";
            this.setState({
                message: { text: errorMessage, type: "error" },
                isLoading: false,
            });
        }
    };

    validateForm = () => {
        const { isSignUpMode, formData } = this.state;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            this.setState({ message: { text: "Invalid email format.", type: "error" } });
            return false;
        }
        if (formData.password.length < 6) {
            this.setState({ message: { text: "Password must be at least 6 characters.", type: "error" } });
            return false;
        }
        if (isSignUpMode && !formData.username) {
            this.setState({ message: { text: "Username is required.", type: "error" } });
            return false;
        }
        return true;
    };

    render() {
        const { isSignUpMode, formData, message, isLoading } = this.state;

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
                                {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
                                {isLoading && <p>Loading...</p>}
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
                                <button type="submit" className="login-btn solid inp">
                                    {isLoading ? "Loading..." : "Login"}
                                </button>
                            </form>

                            {/* Sign Up Form */}
                            <form
                                onSubmit={this.handleSubmit}
                                className="sign-up-form login-form"
                            >
                                <h2 className="title">Sign up</h2>
                                {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
                                {isLoading && <p>Loading...</p>}
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
                                <button type="submit" className="login-btn inp">
                                    {isLoading ? "Processing..." : "Sign up"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>New to Our Trekking Community? Join Us!</h3>
                                <p>
                                    Sign up to start your journey through the best trekking spots
                                    in the region.
                                </p>
                                <button
                                    className="login-btn transparent"
                                    onClick={this.toggleSignUpMode}
                                >
                                    Sign up
                                </button>
                            </div>
                            <img src={log} className="image" alt="register" />
                        </div>
                        <div className="panel right-panel">
                            <div className="content">
                                <h3>Already a Member? Sign In!</h3>
                                <p>
                                    Welcome back! Sign in to continue exploring and planning your
                                    trekking adventures.
                                </p>
                                <button
                                    className="login-btn transparent"
                                    onClick={this.toggleSignUpMode}
                                >
                                    Sign in
                                </button>
                            </div>
                            <img src={register} className="image" alt="login" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
