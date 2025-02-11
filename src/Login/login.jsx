import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import log from "../images/log.png";
import register from "../images/register.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebaseConfig.js';
import "./login.css";

const Login = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const toggleSignUpMode = () => {
        setIsSignUpMode((prevMode) => !prevMode);
        setFormData({ username: "", email: "", password: "" });
        setMessage({ text: "", type: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            if (isSignUpMode) {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;
                await saveUserToDatabase({ username: formData.username, email: formData.email, uid: user.uid });
                setMessage({ text: "Registration successful! Please log in.", type: "success" });
                toggleSignUpMode();
            } else {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                setMessage({ text: "Login successful!" });
                navigate("/");
            }
        } catch (error) {
            setMessage({ text: error.message || "Something went wrong.", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setMessage({ text: "Invalid email format.", type: "error" });
            return false;
        }
        if (formData.password.length < 6) {
            setMessage({
                text: "Password must be at least 6 characters.",
                type: "error",
            });
            return false;
        }
        if (isSignUpMode && !formData.username) {
            setMessage({ text: "Username is required.", type: "error" });
            return false;
        }
        return true;
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await saveUserToDatabase({
                username: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL
            });
            console.log("Google Authentication Successful:", user);
            navigate("/");
        } catch (error) {
            console.error("Google Authentication Failed:", error);
            setMessage({ text: error.message, type: "error" });
        }
    };

    const handleFacebookLogin = async () => {
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await saveUserToDatabase({
                username: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL
            });
            console.log("Facebook Authentication Successful:", user);
            navigate("/");
        } catch (error) {
            console.error("Facebook Authentication Failed:", error);
            setMessage({ text: error.message, type: "error" });
        }
    };

    const saveUserToDatabase = async (user) => {
        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error("Failed to save user data");
            }
            console.log("User saved successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-body">
            <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* Sign In Form */}
                        <form onSubmit={handleSubmit} className="sign-in-form login-form">
                            <h2 className="title">Sign in</h2>
                            {message.text && (
                                <p className={`message ${message.type}`}>{message.text}</p>
                            )}
                            {isLoading && <p>Loading...</p>}
                            <div className="input-field">
                                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    className="inp"
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn solid inp">
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </form>
                        <div className="social-media-buttons">
                            <button className="circle-btn" onClick={handleGoogleLogin}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                            <button className="circle-btn">
                                <FontAwesomeIcon icon={faFacebook} onClick={handleFacebookLogin} />
                            </button>
                            <button className="circle-btn">
                                <FontAwesomeIcon icon={faTwitter} />
                            </button>
                        </div>

                        {/* Sign Up Form */}
                        <form onSubmit={handleSubmit} className="sign-up-form login-form">
                            <h2 className="title">Sign up</h2>
                            {message.text && (
                                <p className={`message ${message.type}`}>{message.text}</p>
                            )}
                            {isLoading && <p>Loading...</p>}
                            <div className="input-field">
                                <FontAwesomeIcon icon={faUser} className="icon" />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                onClick={toggleSignUpMode}
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
                                onClick={toggleSignUpMode}
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
};

export default Login;