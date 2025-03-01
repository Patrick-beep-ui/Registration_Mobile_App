import React from 'react';
import { View, Text } from 'react-native';

const ScreenLayout = ({ title, children }) => {
    return (
        <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' , height: '100%', width: '100%'}}>
            {children} 
        </View>
    );
};

export default ScreenLayout;
