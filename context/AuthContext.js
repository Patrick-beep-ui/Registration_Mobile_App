import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(null);

    // Load user from storage on app start
    useEffect(() => {
        const loadUsers = async () => {
            const storedUsers = await AsyncStorage.getItem('users');
            console.log("Stored Users: " + storedUsers)
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            }
        };
        loadUsers();
    }, []);

    // Signup function 
    const signup = useCallback(async (userData) => {
        const existingUsers = users || [];
        const newUser = { ...userData };

        // Check if user already exists
        if (existingUsers.some(user => user.email === newUser.email)) {
            alert('Email already in use!');
            return;
        }

        const updatedUsers = [...existingUsers, newUser];
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    }, [users]);

    // Edit user function
    const updateUser = useCallback(async (newUserData) => {
        if (!users) return;

        const updatedUsers = users.map(u =>
          u.email === newUserData.email ? newUserData : u
        );

        setUsers(updatedUsers);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      }, [users]);

    return (
        <AuthContext.Provider value={{ users, signup, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
