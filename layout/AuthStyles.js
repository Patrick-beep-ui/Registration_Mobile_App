import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        width: '100%',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
    },
    buttonNavigate: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
    },
    buttonImg: {
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#0077b6',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonImgText: {
        color: '#fff',
        textAlign: 'left',
        paddingHorizontal: 10,
        textAlign: 'center', 
    }
});
