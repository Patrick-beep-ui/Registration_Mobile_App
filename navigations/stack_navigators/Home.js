import React, { useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenLayout from '../../layout/ScreenLayout';
import { useFocusEffect } from '@react-navigation/native';
import MapLocation from '../../components/MapComponent';
import WeatherInfo from '../../components/WeatherComponent';
import { StyleSheet, Text, View } from 'react-native';
import SessionTimer from '../../components/SessionTimer';

import * as Location from "expo-location";
import { useEffect, useState } from 'react';

const Home = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const getCurrentLocation = async () => {
                try {
                    const { status } = await Location.requestForegroundPermissionsAsync();

                    if (status !== 'granted') {
                        console.warn("Permission to access location was denied");
                        return;
                    }

                    const location = await Location.getCurrentPositionAsync({});

                    setLocation(location);
                    console.log("Current Location:", location);

                } catch (error) {
                    console.error("Error getting location:", error);
                }
            };
    
            getCurrentLocation();
    }, [])
    

    return (
        <View style={styles.container}>
            <View style={styles.weatherContainer}>
                {location ? <WeatherInfo location={location} /> : <Text>Fetching location...</Text>}
            </View>
            <View style={styles.mapContainer}>
                {location ? <MapLocation location={location} /> : <Text>Loading map...</Text>}
            </View>
            <SessionTimer/>
        </View>
    );
}

const {Navigator, Screen} = createNativeStackNavigator();

function HomeStack() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
          }}>
            <Screen name="Home" component={Home} />
        </Navigator>
    );
}

export default HomeStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
        paddingBottom: 6,
    },
    mapContainer: {
        flex: 1,
        padding: 10,
    },
});