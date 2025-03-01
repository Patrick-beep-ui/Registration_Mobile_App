import React from 'react'
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenLayout from '../../layout/ScreenLayout';
import { useSession } from '../../context/SessionContext';
import UserProfile from '../../components/UserComponent';
import SessionTimer from '../../components/SessionTimer';

const Profile = () => {
    const { session, logout } = useSession();
    return (
        <ScreenLayout title={"Profile"}>
            {session ? 
            <>
                <UserProfile user={session} logout={logout}/>
            </>
            :
                <Text>No Session Available</Text>
            }
        </ScreenLayout>
    )
}

const {Navigator, Screen} = createNativeStackNavigator(); 

function ProfileStack() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
          }}>
            <Screen name="Profile" component={Profile} />
        </Navigator>
    );
}

export default ProfileStack;