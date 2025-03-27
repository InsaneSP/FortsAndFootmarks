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

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage({ text: "Please enter your email.", type: "error" });
            return;
        }
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage({ text: "Password reset email sent! Check your inbox.", type: "success" });
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }
        setIsLoading(false);
    };

    return (
        <div className="reset-password-body">
            <div className="reset-password-container">
                <h2 className="title">Reset Password</h2>
                {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
                <form className="reset-password-form" onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="reset-btn" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send Reset Email"}
                    </button>
                </form>
                <p className="back-to-login" onClick={() => navigate("/login")}>Back to Login</p>
            </div>
        </div>
    );
};

export default ForgotPassword;
