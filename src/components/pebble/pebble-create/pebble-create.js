import axios from 'axios';
import * as React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
    ScrollView,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image
} from "react-native";
import {useState, useEffect} from 'react';
import * as ImagePicker from "react-native-image-picker";
import Geolocation from 'react-native-geolocation-service';
import { useSelector } from 'react-redux';

const {REACT_APP_URL} = process.env;

const defaultValues = {
    Label: ""
}

const PebbleCreate = ({navigation}) => {

    const idUser = useSelector(state => state.session.user.Id);
    const {control, handleSubmit, formState: {errors}, reset} = useForm({defaultValues});
    const [imageData, setImageData] = useState();
    const [currentPosition, setCurrentPosition] = useState();
    let styles = null;

    useEffect(() => {
        Geolocation.getCurrentPosition((position) => {
            setCurrentPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            
        }, (error) => {
            console.log(error.code, error.message);
        }, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        });
    }, [imageData])

    // Action Button
    const onPressPicture = () => {
        const options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: true,
            includeExtra: true
        };

        ImagePicker.launchCamera(options, (response) => {
            setImageData(response.assets)
        });
    }

    const onSubmit = (data) => {
        if (imageData && currentPosition) {
            let formData = {
                Label: data.Label,
                Img: `data:${imageData[0].type};base64,${imageData[0].base64}`,
                IdCreator: idUser,
                Position: currentPosition

            };
            axios.post(REACT_APP_URL + '/pebble', formData).then(() => {
                navigation.navigate('account');
                setImageData();
                setCurrentPosition();
            }).catch((err) => {
                console.log("err", err)
            })
        }
    }

    if(imageData){
       styles = StyleSheet.create({
            preview: {
              width: imageData[0].width / 5,
              height: imageData[0].height / 5,
              margin: 10
            },
          });
    }

    return (
        <ScrollView>
            {imageData && 
            <>
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
                            placeholder='Title of Pebble'
                        />
                        )}
                        name="Label"
                    />
                    {errors.Label && <Text>Title is required.</Text>}
                <Image
                style={styles.preview} 
                source={{uri:`data:${imageData[0].type};base64,${imageData[0].base64}`}}/>
            </>
            }
            <Button title='Take picture'onPress={onPressPicture}/>
            <Text></Text>
            <Button title='Save' onPress={handleSubmit(onSubmit)}/>
        </ScrollView>
    );
}


export default PebbleCreate;


