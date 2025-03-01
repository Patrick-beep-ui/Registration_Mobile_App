import axios from 'axios';
import {memo, useState, useEffect} from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';

const API_KEY = '1120f1dcec0e0f73199de23ba4f711d5';

const WeatherInfo = ({location}) => {
    const [weatherData, setWeatherData] = useState(null);

    if (!location || !location.coords) {
        return <Text>Fetching location...</Text>;
    }

    const { latitude, longitude } = location.coords;
    
    useEffect(() => {
        const getWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                );
                setWeatherData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        if (latitude && longitude) {
            getWeather();
        }

    }, [latitude, longitude]);

    return (
        <View style={styles.container}>
            {weatherData ? (
                <>
                    <Text style={styles.location}>{weatherData.name}</Text>
                    <Image
                        source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
                        style={styles.icon}
                    />
                    <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
                    <Text style={styles.description}>{weatherData.weather[0].description}</Text>
                </>
            ) : (
                <Text>Weather data not available</Text>
            )}
        </View>
    );

}

export default memo(WeatherInfo);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
    },
    location: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
    },
    description: {
        fontSize: 18,
        textTransform: 'capitalize',
    },
    icon: {
        width: 50,
        height: 50,
        marginVertical: 5,
    },
});