import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const { users } = useAuth();
    const [session, setSession] = useState(null);
    const [sessionStart, setSessionStart] = useState(0);

    // Load session on app start
    useEffect(() => {
        const loadSession = async () => {
            const storedSession = await AsyncStorage.getItem('session');
            if (storedSession) {
                setSession(JSON.parse(storedSession));
            }
        };
        loadSession();
    }, []);

    // Login Function
    const login = useCallback(async (email, password) => {
        if (!email || !password) {
            alert("Email and password required!");
            return;
        }

        const foundUser = users.find(user => user.email === email && user.password === password);
        if (!foundUser) {
            alert("Invalid credentials!");
            return;
        }

        // Store session
        const sessionData = { ...foundUser, sessionStart: Date.now() };
        setSession(sessionData);
        await AsyncStorage.setItem('session', JSON.stringify(sessionData));
        setSessionStart(Date.now());
        return true;
    }, [users]);


    // Logout / Destroy Session Function
    const logout = useCallback(async () => {
        if (sessionStart) {
            const sessionEnd = Date.now();
            const duration = Math.floor((sessionEnd - sessionStart) / 1000); // Convert to seconds

            const hours = String(Math.floor(duration / 3600)).padStart(2, '0'); // Display the seconds in a 2 digit format
            const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
            const seconds = String(duration % 60).padStart(2, '0');

            const formattedDuration = `${hours}:${minutes}:${seconds}`;

            alert(`User logged out! Session Duration: ${formattedDuration}`);
        } else {
            alert('User logged out!');
        }

        setSession(null);
        await AsyncStorage.removeItem('session');
    }, [sessionStart, session]);

    // Update the user session
    const updateUser = useCallback(async (newUserData) => {
        setSession(newUserData);
        await AsyncStorage.setItem('session', JSON.stringify(newUserData));
      }, []);   


    return (
        <SessionContext.Provider value={{ session, login, logout, updateUser, sessionStart }}>
            {children}
        </SessionContext.Provider>
    );
};
