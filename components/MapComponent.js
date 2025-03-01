import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {memo} from 'react';

const MapLocation = ({ location }) => {
    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={location.coords} title="You are here" />
                </MapView>
            ) : (
                <Text>Loading location ...</Text>
            )}
        </View>
    );
};

export default memo(MapLocation);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
