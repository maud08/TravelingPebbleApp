import axios from 'axios';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, TextInput, Button, SafeAreaView} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { start } from '../../../store/sessionSlice';
import stylesApp from '../../../app-styles';

const {REACT_APP_URL} = process.env;

const defaultValues = {
    Email: '',
    Password: '',
}

const UserLogin = ({navigation}) => {

    const dispatch = useDispatch();
   

    const {control, handleSubmit, formState: { errors }, reset} = useForm({defaultValues});

    const onSubmit = (data) => {
        axios.post(REACT_APP_URL + '/login',{...data})
        .then((res) => {
            const token = jwtDecode(res.data.accesToken);
            AsyncStorage.setItem('@storage_Token', res.data.accesToken)
            dispatch(start(token))
            navigation.navigate('account');
        })
        .catch((err) => {
            console.log("err",err)
        })    
        
    }

    return (
      <SafeAreaView style={stylesApp.container}>
        <View style={stylesApp.content}>
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={stylesApp.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType='email-address'
                placeholder='Votre Email'
              />
            )}
            name="Email"
          />
          {errors.Email && <Text>Email is required.</Text>}

          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={stylesApp.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                placeholder='Votre mot de passe'
              />
            )}
            name="Password"
          />
          {errors.Password && <Text>Password is required.</Text>}

          <View style={stylesApp.viewSend}>
            <Button title="Connexion" onPress={handleSubmit(onSubmit)} color={'#04BF9D'}/>
          </View>
          
        </View>

      </SafeAreaView>
    );
    
    
};
export default UserLogin;