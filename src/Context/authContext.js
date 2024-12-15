import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const login = async (email, password) => {
        try {
            const response = await fetch(`http://localhost:3001/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error("Login failed:", data.message);
                return alert(data.message || "Something went wrong.");
            }
    
            // Successful login: store token and update state
            localStorage.setItem("token", data.token);
            setIsAuthenticated({ isAuthenticated: true, token: data.token });
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong.");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
