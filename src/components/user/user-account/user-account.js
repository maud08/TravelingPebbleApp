import axios from 'axios';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {View,Text,Image, FlatList, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesApp from '../../../app-styles';
import UserAccountStyles from './user-acount-styles';



const {REACT_APP_URL} = process.env;
const {REACT_APP_IMG} = process.env;
    
const UserAccount= (props) => {

    const user = useSelector(state => state.session.user);

    const [creatorPebble, setCreatorPebble] = useState([]);
    const [playerPebble, setPlayerPebble] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("@storage_Token")
        .then(token => {
            if(!token) return;
            const config = {headers:{Authorization:"Bearer " + token}}
            axios.get(REACT_APP_URL + '/pebble/creator/' + user.Id, config)
            .then(({data})=>{

                setCreatorPebble(data);
            })
            .catch((err) => {
                console.log("err", err)
            })
        })


        
    },[getItem])

    const getItem = (item) => {
        if(item.Img){
           let styles = StyleSheet.create({
                 preview: {
                   width: 100,
                   height: 100,
                   marginVertical: 10
                 },
               });
            return(
                <View>
                    <Text style={UserAccountStyles.titleItem}>{item.Label}</Text>
                    <Image style={styles.preview} source={{uri:`${REACT_APP_IMG+item.Img}`}}/>
                </View>
            )
         }
       
    }

    return(
        <SafeAreaView style={stylesApp.container}>
            <View style={stylesApp.content}>
                <View style={UserAccountStyles.viewInfo}>
                    <Text style={UserAccountStyles.viewInfo.title}>Vos informations</Text>
                    <Text>Email: {user.Email}</Text>
                </View>
                {creatorPebble && 
                    <>
                        <Text style={stylesApp.title2}>Vos galets</Text>
                        <FlatList
                            style={stylesApp.list}
                            data={creatorPebble}
                            renderItem={({item}) => getItem(item)}
                        />
                    </>
                }
            </View>
        </SafeAreaView>
    );
};
export default UserAccount;