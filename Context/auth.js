import { apiURL } from "../src/hooks/api.js";

// This file should only handle the API call and return the response to the AuthProvider
export const registerUser = async ({ username, email, password }) => {
    console.log(username, email, password);
    try {
        const response = await fetch(`${apiURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Registration failed', error);
        throw error;
    }
};

export const loginUser = async ({ username, password }) => {
    try {
        const response = await fetch(`${apiURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data; // Return the parsed JSON data
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
};
