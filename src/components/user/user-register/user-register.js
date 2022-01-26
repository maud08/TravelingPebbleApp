import * as React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, TextInput, Button, Alert, Modal, Pressable, StyleSheet } from "react-native";
import { useState } from 'react';


const {REACT_APP_URL} = process.env;

const defaultValues = {
    Email: '',
    Pseudo: '',
    Password: '',
    Country: '',
}

const UserRegister = () => {

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
    <View>
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

      <Text>Pseudo</Text>
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
          />
        )}
        name="Pseudo"
      />
      {errors.Pseudo && <Text>Pseudo is required.</Text>}

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

      <Text>Country</Text>
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
          />
        )}
        name="Country"
      />
      {errors.Country && <Text>Country is required.</Text>}


      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You are well registered !</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                  setModalVisible(!modalVisible);  
                  reset();
                }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      }
    </View>
    );


}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default UserRegister;