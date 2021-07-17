import React, { useState } from 'react'
import { ScrollView, Text, TextInput, Button, View } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './NewPlaceScreen.styles'
import { INewPlaceInputs } from '../../types/forms.types';
import colors from '../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlacesNavigatorParamList } from '../../types/navigation.types';
import { useDispatch } from 'react-redux';
import { addPlace } from '../../state/places.state';
import ImagePickerComponent from '../../components/image-selector/ImagePicker';
import LocationPicker from '../../components/location-picker/LocationPicker';
import { RouteProp } from '@react-navigation/native';
import { IPlace } from '../../types/places.types';

const NewPlaceSchema = yup.object().shape({
  title: yup.string().required(),
  image: yup.string().required(),
  location: yup.string().required()
});

type NewPlaceScreenNavigationProp = StackNavigationProp<PlacesNavigatorParamList, 'NewPlace'>

interface INewPlaceScreenProps {
  navigation: NewPlaceScreenNavigationProp
  route: RouteProp<PlacesNavigatorParamList, "NewPlace">
}

const NewPlaceScreen = ({ navigation, route }: INewPlaceScreenProps) => {
  const dispatch = useDispatch()
  const [formError, setFormError] = useState<string | null>(null)
  const { control, handleSubmit, formState: { errors } } = useForm<INewPlaceInputs>({
    resolver: yupResolver(NewPlaceSchema)
  });

  const onSubmit = async (data: INewPlaceInputs) => {
    try {
      setFormError(null)
      const coordinates = JSON.parse(data.location)
      const place: IPlace = {
        title: data.title,
        image: data.image,
        lat: coordinates.lat,
        lng: coordinates.lng
      }

      await dispatch(addPlace(place));
      navigation.goBack();
    } catch (error: any) {
      setFormError(error.message)
    }
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
          defaultValue=""
        />
        {errors.title ? <Text style={styles.errorText}>Please enter a title</Text> : null}
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <ImagePickerComponent
              onImagePicked={(value: string) => onChange(value)}
            />
          )}
          name="image"
          defaultValue=""
        />
        {errors.image ? <Text style={styles.errorText}>Please pick an image</Text> : null}
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <LocationPicker
              navigation={navigation}
              route={route}
              onLocationPicked={(value: string) => onChange(value)}
            />
          )}
          name="location"
          defaultValue=""
        />
        {errors.location ? <Text style={styles.errorText}>Your location is required.</Text> : null}
        <Button
          title="Save Place"
          color={colors.primary}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      {formError ? <Text style={{ width: '100%', textAlign: "center", ...styles.errorText }}>{formError}</Text> : null}
    </ScrollView>
  )
}

export default NewPlaceScreen
