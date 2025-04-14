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
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
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
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const navigate = useNavigate();

    const auth = getAuth(app);

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
                await saveUserToDatabase({
                    username: formData.username,
                    email: formData.email,
                    uid: user.uid,
                });
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;<>?~])[A-Za-z\d!@#$%^&*()_+={}:;<>?~]{8,}$/;
        const forbiddenCharsRegex = /["'\\]/;
    
        // Validate Email
        if (!emailRegex.test(formData.email)) {
            setMessage({ text: "Invalid email format.", type: "error" });
            return false;
        }
    
        // Validate Password
        if (!passwordRegex.test(formData.password)) {
            setMessage({
                text: "Password must be 8+ characters, include uppercase, lowercase, number, and symbol.",
                type: "error",
            });
            return false;
        }
    
        if (forbiddenCharsRegex.test(formData.password)) {
            setMessage({
                text: "Password must not contain quotes or backslashes.",
                type: "error",
            });
            return false;
        }
    
        // Validate Username (only in sign-up mode)
        if (isSignUpMode) {
            if (!formData.username.trim()) {
                setMessage({ text: "Username is required.", type: "error" });
                return false;
            }
    
            if (!usernameRegex.test(formData.username)) {
                setMessage({
                    text: "Username must be 3-20 characters, alphanumeric or underscore only.",
                    type: "error",
                });
                return false;
            }
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

    const generateAvatar = (username) => {
        const firstLetter = username.charAt(0).toUpperCase();

        const colors = [
            "#4CAF50", // Green
            "#FF5733", // Red
            "#FFB300", // Orange
            "#00BCD4", // Cyan
            "#9C27B0", // Purple
            "#2196F3", // Blue
            "#E91E63", // Pink
            "#3F51B5", // Indigo
            "#607D8B", // Blue Grey
            "#CDDC39", // Lime
        ];

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 100;

        canvas.width = size;
        canvas.height = size;

        ctx.fillStyle = randomColor;
        ctx.fillRect(0, 0, size, size);

        ctx.font = '40px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(firstLetter, size / 2, size / 2);

        return canvas.toDataURL();
    };

    const saveUserToDatabase = async (user) => {
        try {
            const avatar = user.photoURL || generateAvatar(user.username);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    uid: user.uid,
                    photoURL: avatar,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save user data");
            }

            console.log("User saved successfully");
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            setMessage({ text: "Please enter your email.", type: "error" });
            return;
        }
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setMessage({ text: "Password reset email sent! Check your inbox.", type: "success" });
            setForgotPasswordMode(false);
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }
        setIsLoading(false);
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
                            <div className="social-media-buttons">
                            <button className="circle-btn" onClick={handleGoogleLogin}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                            <button className="circle-btn">
                                <FontAwesomeIcon icon={faFacebook} onClick={handleFacebookLogin} />
                            </button>
                            {/* <button className="circle-btn">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </button> */}
                        </div>
                        <p className="forgot-password" onClick={() => navigate("/forgot")}>
                            Forgot Password?
                        </p>
                        </form>

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
                            <div className="social-media-buttons">
                            <button className="circle-btn" onClick={handleGoogleLogin}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                            <button className="circle-btn">
                                <FontAwesomeIcon icon={faFacebook} onClick={handleFacebookLogin} />
                            </button>
                            {/* <button className="circle-btn">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </button> */}
                        </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New to Our Trekking Community? Join Us!</h3>
                            <p>
                                Sign up to start your journey through the best trekking spots in the region.
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
                                Welcome back! Sign in to continue exploring and planning your trekking adventures.
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