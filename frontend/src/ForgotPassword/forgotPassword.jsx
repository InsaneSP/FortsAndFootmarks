import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebaseConfig.js";
import "./forgotpassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const auth = getAuth(app);

    // Stricter email regex
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email.trim());
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();

        // Check empty field
        if (!trimmedEmail) {
            setMessage({ text: "Email is required.", type: "error" });
            return;
        }

        // Check email format
        if (!validateEmail(trimmedEmail)) {
            setMessage({ text: "Please enter a valid email address.", type: "error" });
            return;
        }

        setIsLoading(true);
        setMessage({ text: "", type: "" });

        try {
            await sendPasswordResetEmail(auth, trimmedEmail);
            setMessage({
                text: "If this email is registered, a reset link has been sent.",
                type: "success"
            });
        } catch (error) {
            setMessage({
                text: "Unable to send reset email. Please try again later.",
                type: "error"
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="reset-password-body">
            <div className="reset-password-container">
                <h2 className="title">Reset Password</h2>

                {message.text && (
                    <p className={`message ${message.type}`}>{message.text}</p>
                )}

                <form className="reset-password-form" onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="reset-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send Reset Email"}
                    </button>
                </form>

                <p
                    className="back-to-login"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;