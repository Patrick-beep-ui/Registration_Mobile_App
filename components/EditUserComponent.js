import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, TextInput, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { authStyles } from '../layout/AuthStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

const EditUserModal = ({ user, isVisible, onClose, onSave }) => {
  const { updateUser: updateUserInAuth } = useAuth();
  const [bio, setBio] = useState(user.bio);
  const [picture, setPicture] = useState(user.picture);

  // Update local state when user prop changes
  useEffect(() => {
    setBio(user.bio);
    setPicture(user.picture);
  }, [user]);

  // Handle image picking
  const pickImage = useCallback(async () => {
    Alert.alert(
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


  const handleSave = async () => {
    if (!bio) {
      Alert.alert('Error', 'Bio cannot be empty');
      return;
    }
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      let usersArray = storedUsers ? JSON.parse(storedUsers) : [];

      const updatedUsers = usersArray.map((u) =>
        u.email === user.email ? { ...u, bio, picture } : u
      );
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update AuthContext's users list
      await updateUserInAuth({ ...user, bio, picture });

      // Call the onSave callback with updated user data.
      onSave({ ...user, bio, picture });

      Alert.alert('Success', 'Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };
  

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={authStyles.container}>
        <Text style={authStyles.title}>Edit Profile</Text>

        <TextInput
          style={authStyles.input}
          placeholder="Update Bio"
          value={bio}
          onChangeText={setBio}
        />

        <Pressable style={authStyles.buttonImg} onPress={pickImage}>
          <Text style={authStyles.buttonImgText}>
            {picture ? 'Picture Selected' : 'Upload New Picture'}
          </Text>
        </Pressable>

        <Pressable style={authStyles.button} onPress={handleSave}>
          <Text style={authStyles.buttonText}>Save Changes</Text>
        </Pressable>

        <Pressable style={authStyles.buttonNavigate} onPress={onClose}>
          <Text style={authStyles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default EditUserModal;
