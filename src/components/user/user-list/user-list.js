import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {View, Text, FlatList} from 'react-native';


const {REACT_APP_URL} = process.env

const UserList = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(REACT_APP_URL + '/user')
            .then(({data}) => {
                setData(data) 
            })
            .catch(err => {console.log(err)})
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
