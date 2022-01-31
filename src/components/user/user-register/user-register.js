import * as React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, TextInput, Button, Alert, Modal, Pressable, StyleSheet } from "react-native";
import { useState } from 'react';
import stylesApp from '../../../app-styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserRegisterStyle from './user-register-styles';


const {REACT_APP_URL} = process.env;

const defaultValues = {
    Email: '',
    Pseudo: '',
    Password: '',
    Country: '',
}

const UserRegister = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const {control, handleSubmit, formState: { errors }, reset} = useForm({defaultValues});

    const onSubmit = (data) => {
        axios.post(REACT_APP_URL + '/user/register',{...data})
        .then((res) => {
            if(res.status === 200){
                setModalVisible(true);
            }
        })
        .catch((err) => {
            console.log("err",err)
        })    
        
    }

    return(
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
            placeholder='Votre Pseudo'
          />
        )}
        name="Pseudo"
      />
      {errors.Pseudo && <Text>Pseudo is required.</Text>}

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
            placeholder='Votre pays'
          />
        )}
        name="Country"
      />
      {errors.Country && <Text>Country is required.</Text>}


      <View style={stylesApp.viewSend}>
        <Button title="Inscription" onPress={handleSubmit(onSubmit)} color={'#04BF9D'}/>
      </View>

      {modalVisible && 
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={UserRegisterStyle.centeredView}>
          <View style={UserRegisterStyle.modalView}>
            <Text style={UserRegisterStyle.modalText}>Merci pour votre inscription!</Text>
            <Pressable
              style={[UserRegisterStyle.button, UserRegisterStyle.buttonClose]}
              onPress={() => {
                  reset();
                  setModalVisible(!modalVisible);  
                  navigation.navigate('Login')
                }}
            >
              <Text style={UserRegisterStyle.textStyle}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      }
      </View>
    </SafeAreaView>
    );


}


export default UserRegister;