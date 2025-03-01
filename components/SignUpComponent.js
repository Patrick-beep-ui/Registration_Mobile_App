import { View, Text, Pressable, TextInput, Alert } from 'react-native' 
import { useNavigation } from '@react-navigation/native'; 
import { authStyles } from '../layout/AuthStyles'
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker' 

const SignUp = () => {
    const {goBack} = useNavigation();
    const { signup } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState(null);

    // Validators
    const validateEmail = useCallback((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, [email])

    const validatePassword = useCallback((password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }, [password])

    // Sign Up / Create User functionality
    const signUp = useCallback(async () => {
        if (!email || !password || !firstName || !lastName || !bio) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert('Error', 'Password must be at least 8 characters long, include at least 1 number, and 1 special character.');
            return;
        }

        const newUser = { firstName, lastName, email, password, bio, picture };

        console.log('New User: ', newUser);

            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            signup(newUser);
            Alert.alert('Success', 'Account created successfully');
            goBack();

    }, [email, password, bio, firstName, lastName])

  const pickImage = useCallback(async () => {
    const result = await Alert.alert(
        'Select an option',
        'Choose an option for your profile picture.',
        [
            {
                text: 'Take a Photo',
                onPress: async () => {
                    let cameraResult = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [4, 4],
                        quality: 1,
                    });

                    if (!cameraResult.canceled) {
                        setPicture(cameraResult.assets[0].uri);
                    }
                },
            },
            {
                text: 'Pick from Gallery',
                onPress: async () => {
                    let galleryResult = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [4, 4],
                        quality: 1,
                    });

                    if (!galleryResult.canceled) {
                        setPicture(galleryResult.assets[0].uri);
                    }
                },
            },
            { text: 'Cancel', style: 'cancel' },
        ]
    );
}, []);
  

    return (
        <View style={authStyles.container}>
            <Text style={authStyles.title}>Sign Up</Text>
            <View style={{ width: '80%' }}>
                <TextInput style={authStyles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
                <TextInput style={authStyles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName}/>
                <TextInput style={authStyles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
                <TextInput style={authStyles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
                <TextInput style={authStyles.input} placeholder='Short Biography' value={bio} onChangeText={setBio} />
                <Pressable style={authStyles.buttonImg} onPress={() => pickImage()}>
                    <Text style={authStyles.buttonImgText}>
                        {picture ? "Picture Selected" : "Upload Picture"}
                    </Text>
                </Pressable>
            </View>
            <Pressable style={authStyles.button} onPress={() => signUp()}>
                <Text style={authStyles.buttonText}>Sign Up</Text>
            </Pressable>

            <Pressable style={authStyles.buttonNavigate} onPress={() => goBack()}>
                <Text style={authStyles.buttonText}>Log in</Text>
            </Pressable>
        </View>
    )
}

export default SignUp