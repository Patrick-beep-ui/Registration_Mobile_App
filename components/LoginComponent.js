import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useSession } from '../context/SessionContext';
import { authStyles } from '../layout/AuthStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';

const Login = () => {
    const { login } = useSession();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = useCallback(async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and password required!");
            return;
        }

        console.log("Email from Login: " + email);
        console.log("Password from Login: " + password);

        const success = await login(email, password);
        if (success) {
            Alert.alert("Success", "User Logged In successfully");
            navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTap' }],
            });
        } else {
            Alert.alert("Error", "Invalid email or password");
        }
    }, [email, password, login]);  

    return (
        <View style={authStyles.container}>
            <Text style={authStyles.title}>Login</Text>
            <View style={{ width: '80%' }}>
                <TextInput style={authStyles.input} placeholder="Email" onChangeText={setEmail} keyboardType="email-address" />
                <TextInput style={authStyles.input} placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />
            </View>
            <Pressable style={authStyles.button} onPress={() => loginUser()}>
                <Text style={authStyles.buttonText}>Log In</Text>
            </Pressable>

            <Pressable style={authStyles.buttonNavigate} onPress={() => navigation.navigate('SignUp')}>
                <Text style={authStyles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    )
}

export default Login