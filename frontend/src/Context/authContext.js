import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import app from "../firebaseConfig.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const response = await axios.get(
                        // `http://localhost:3001/users/${firebaseUser.uid}`
                        `${process.env.REACT_APP_API_URL}/users/${firebaseUser.uid}`
                    );
                    const userData = response.data;
                    setUser({
                        uid: firebaseUser.uid,
                        username: userData.username,
                        photoURL: userData.photoURL || firebaseUser.photoURL,
                      });                      
                } catch (error) {
                    console.error("Error fetching username:", error);
                }
            } else {
                setUser(null);
            }
        });
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser ? { ...currentUser, photoURL: currentUser.photoURL } : null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);