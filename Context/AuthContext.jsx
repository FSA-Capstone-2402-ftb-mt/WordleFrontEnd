import { createContext, useEffect, useState } from 'react';
import { registerUser, loginUser } from './auth.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    // Load any existing user from localStorage when the app starts
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('userData'));
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
            setUser(savedUser);
            setIsAuthenticated(true);
            setIsAdmin(savedUser.isAdmin);
        }
    }, []);

    const register = async ({ username, email, password }) => {
        try {
            // Call the register API through the auth.js function
            const data = await registerUser({ username, email, password });

            // Set the user data and token in localStorage
            setUser({ username: data.username, isAdmin: data.isAdmin });
            setIsAuthenticated(true);
            setIsAdmin(data.isAdmin);
            localStorage.setItem('userData', JSON.stringify({ username: data.username, isAdmin: data.isAdmin }));
            localStorage.setItem('token', data.token);

            return data;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            // Call the loginUser function, which returns parsed data directly
            const data = await loginUser(credentials);

            // Set the user data and token in localStorage
            setUser({ username: data.dataUser, isAdmin: data.admin });
            setIsAuthenticated(true);
            setIsAdmin(data.admin);
            localStorage.setItem('userData', JSON.stringify({ username: data.dataUser, isAdmin: data.admin }));
            localStorage.setItem('authToken', data.token);
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
