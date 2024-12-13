import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
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
