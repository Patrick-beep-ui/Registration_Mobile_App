import React, {memo, useState, useCallback} from 'react'
import { View, Text, Pressable, TextInput, Alert, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditUserModal from './EditUserComponent';
import { useSession } from '../context/SessionContext';

const UserProfile = ({user, logout}) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const { updateUser } = useSession();

    const handleLogout = () => {
        logout();

        navigation.reset({
            index: 0,
            routes: [{ name: 'Registration' }],
        }); 
    };

    const openEditModal = useCallback(() => {
      setModalVisible(true);
    }, [isModalVisible]);

    const closeModal = useCallback(() => {
      setModalVisible(false);
    }, [isModalVisible]);



  // When saving changes, update the session
    const handleSaveChanges = useCallback((newData) => {
      updateUser({ ...user, bio: newData.bio, picture: newData.picture });
      closeModal();
    }, [user, updateUser, closeModal]);

    return(
        <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
            {user.picture ? (
                // Render Picture from Device
                <Image
                source={{ uri: user.picture }}
                style={styles.profilePicture}
                />
                    ) : (
                <View style={styles.placeholderImage}>
                <Text style={styles.imageText}>No Image</Text> 
                </View>
                    )}
            </View>
            
            <View style={styles.userInfoContainer}>
            <Text style={styles.label}>
                First Name: 
                <Text style={styles.infoText}> {user.firstName}</Text>
            </Text>
            <Text style={styles.label}>
                Last Name: 
                <Text style={styles.infoText}> {user.lastName}</Text>
            </Text>
            <Text style={styles.label}>
                Email: 
                <Text style={styles.infoText}> {user.email}</Text>
            </Text>
            <Text style={styles.shortBioHeader}>Short Bio:</Text>
            <Text style={styles.shortBio} >{user.bio}</Text>
            <Pressable style={styles.editButton} onPress={openEditModal}>
                <Text style={styles.logoutTxt}>Edit User</Text>
            </Pressable>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutTxt}>Log out</Text>
            </Pressable>
            </View>
            <EditUserModal
                isVisible={isModalVisible}  
                onClose={closeModal}
                onSave={handleSaveChanges}
                user={user}
            />
      </View>
    )
}

export default memo(UserProfile)

const styles = StyleSheet.create({
    profileContainer: {
        display: 'flex',
        alignItems: 'center', 
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        marginHorizontal: 20 ,
        padding: 20,
        width: '100%',
        height: '100%',
        },
      imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      profilePicture: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ccc',
      },
      placeholderImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      userInfoContainer: {
        alignItems: 'flex-start',
        width: '100%',
      },
      infoText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 400,
      },
      shortBioHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
      },
      shortBio: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        lineHeight: 22,
      },
      label :{
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
      },

      logoutButton: {
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: 5,
        color: '#fff',
        marginTop: 10,
      },
      logoutTxt: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff',
      },
      editButton: {
        backgroundColor: '#00f',
        padding: 10,
        borderRadius: 5,
        color: '#fff',
        marginTop: 20,
      }    
})