import axios from 'axios';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, TextInput, Button, Alert, Modal, Pressable, StyleSheet } from "react-native";
import { useState } from 'react';
import * as ImagePicker from "react-native-image-picker";
import {decode as atob, encode as btoa} from 'base-64'

const {REACT_APP_URL} = process.env;

const defaultValues = {
    Img: {},
    IdCreator: "",
    lat: "",
    lng: "",
}

const PebbleCreate = () => {

    const {control, handleSubmit, formState: { errors }, reset} = useForm({defaultValues});
    const [imageData, setImageData] = useState();


    //action
    const onPressPicture = () => {
       const type = 'capture';
       const options= {
           saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: true,
            includeExtra: true,
        };

        ImagePicker.launchCamera(options,(response) => {
            setImageData(response.assets)
            
        });
    }

    // function dataURLtoFile(bstr, filename, mime) {
 
        
    //         bstr = atob(bstr);
    //         let n = bstr.length;
    //         u8arr = new Uint8Array(n);

            
    //     while(n--){
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
        
    //     return new File([u8arr], filename, {type:mime});
    // }

    const base64ToBlob = (dataurl) => {
          
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1]
        const sliceSize = 1024;
        const byteChars = atob(arr[1]);
        const byteArrays = [];
        for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
          let slice = byteChars.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {type: mime});
      }
    const onValide =  () => {
        //let formData = new FormData();
        // let file = "";
        if(imageData){
             //return a promise that resolves with a File instance
    
    
    //Usage example:
            
            //let file =  dataURLtoFile(imageData[0].base64, imageData[0].fileName, imageData[0].type)
            // let file = base64ToBlob(`data:${imageData[0].type};base64,${imageData[0].base64}`);
            // file.name = imageData[0].fileName;

            //formData.append("Img", file, file.name);
            // formData.append("IdCreator","61f118e6d871d23b31aceec6");
            // formData.append("lat",50.43298536784401);
            // formData.append("lng",4.4400271534902656);
            //console.log("file",file)
            let formData = {
                Img: `data:${imageData[0].type};base64,${imageData[0].base64}`,
                IdCreator:  "61f118e6d871d23b31aceec6",
                lat:50.43298536784401,
                lng: 4.4400271534902656

            };
            axios.post(REACT_APP_URL + '/pebble', formData, /*{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Content-Length': file.size
                }
            }*/)
            .then((res) => {
                console.log("ok",res)
            })
            .catch((err) => {
                console.log("err",err)
            }) 
        }
    }


   

    return( 
        <View>
            <Button title='Take picture' onPress={onPressPicture}/>
            <Text></Text>
            <Button title='Valide' onPress={onValide}/>
        </View>
    );
}


export default PebbleCreate;


