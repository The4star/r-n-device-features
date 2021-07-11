import React from 'react'
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

const NewPlaceSchema = yup.object().shape({
  title: yup.string().required(),
});

type NewPlaceScreenNavigationProp = StackNavigationProp<PlacesNavigatorParamList, 'NewPlace'>

interface INewPlaceScreenProps {
  navigation: NewPlaceScreenNavigationProp
}

const NewPlaceScreen = ({ navigation }: INewPlaceScreenProps) => {
  const dispatch = useDispatch()
  const { control, handleSubmit, formState: { errors } } = useForm<INewPlaceInputs>({
    resolver: yupResolver(NewPlaceSchema)
  });

  const onSubmit = (data: INewPlaceInputs) => {
    dispatch(addPlace(data));
    navigation.goBack();
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
        <Button
          title="Save Place"
          color={colors.primary}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  )
}

export default NewPlaceScreen
