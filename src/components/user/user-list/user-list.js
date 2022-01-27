import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {REACT_APP_URL} = process.env

const UserList = () => {

    const [data, setData] = useState([])


    useEffect(()=>{
        AsyncStorage.getItem("@storage_Token").then(token => {
            if(!token)return;
            const config = {headers:{Authorization:"Bearer " + token}}

            axios.get(REACT_APP_URL + '/user', config)
                .then(({data}) => {
                    setData(data) 
                })
                .catch(err => {console.log(err)})

            }) 
        
    },[])

    return(
        <View>
            <Text>Email - Pseudo - Pays</Text>
            <FlatList
            data={data}
            renderItem={({item}) => <Text>{item.Email} - {item.Pseudo} {item.Country}</Text>}
            />
        </View>
   
    )

}

export default UserList;
