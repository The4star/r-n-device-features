import React, { useState } from 'react'
import { View, Button, Text, Image, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../constants/colors';

import styles from './ImagePicker.styles';

interface IImagePickerProps {
  onImagePicked: (value: string) => void
}

const ImagePickerComponent = ({ onImagePicked }: IImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<any>(null)

  const permissionValidator = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false
      } else {
        return true
      }
    }
  }

  const pickImageHandler = async () => {
    try {
      const permission = await permissionValidator();
      if (permission) {
        const image = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.5
        });
        if (!image.cancelled) {
          setPickedImage(image.uri)
          onImagePicked(image.uri)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.imagePicker}>
      <TouchableOpacity style={styles.imagePreview} onPress={pickImageHandler}>
        {
          pickedImage ?
            <Image style={styles.image} source={{ uri: pickedImage }} />
            :
            <Text>No image picked yet</Text>
        }

      </TouchableOpacity>
      <Button
        title="Pick Image"
        color={colors.primary}
        onPress={pickImageHandler}
      />
    </View>
  )
}

export default ImagePickerComponent;
