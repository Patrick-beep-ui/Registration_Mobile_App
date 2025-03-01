import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from '../components/SignUpComponent';
import Login from '../components/LoginComponent';

const {Navigator, Screen} = createNativeStackNavigator();

function Registration() {
    return (
        <Navigator initialRouteName="Login" screenOptions={{
            headerShown: false,
          }}>
            <Screen name="SignUp" component={SignUp} />
            <Screen name="Login" component={Login} />
        </Navigator>
    );
}

export default Registration;