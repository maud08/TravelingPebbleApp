import axios from 'axios';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, TextInput, Button, Alert, Modal, Pressable, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { start } from '../../../store/sessionSlice';

const {REACT_APP_URL} = process.env;

const defaultValues = {
    Email: '',
    Password: '',
}

const UserLogin = () => {

    const dispatch = useDispatch();

    const {control, handleSubmit, formState: { errors }, reset} = useForm({defaultValues});

    const onSubmit = (data) => {
        axios.post(REACT_APP_URL + '/login',{...data})
        .then((res) => {
            const token = jwtDecode(res.data.accesToken);
            AsyncStorage.setItem('@storage_Token', res.data.accesToken)
            dispatch(start(token))
            console.log("decode===", token)
        })
        .catch((err) => {
            console.log("err",err)
        })    
        
    }




    return <View>
    <Text>Email</Text>
  <Controller
    control={control}
    rules={{
     required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        keyboardType='email-address'
        
      />
    )}
    name="Email"
  />
  {errors.Email && <Text>Email is required.</Text>}

  
  <Text>Password</Text>
  <Controller
    control={control}
    rules={{
     required: true,
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        secureTextEntry={true}
      />
    )}
    name="Password"
  />
  {errors.Password && <Text>Password is required.</Text>}

  


  <Button title="Submit" onPress={handleSubmit(onSubmit)} />
  </View>
};
export default UserLogin;