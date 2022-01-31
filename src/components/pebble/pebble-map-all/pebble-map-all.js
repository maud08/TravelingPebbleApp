import axios from 'axios';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {View,Text,TextInput,Button,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
    
const {REACT_APP_URL} = process.env;

const PebbleMapAll = () => {

    const [pebbles, setPebbles] = useState();
    const [currentPosition, setCurrentPosition] = useState();


    const window = Dimensions.get('window');
    const { width, height }  = window;
    const LATITUD_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUD_DELTA + (width / height);

    useEffect(() => {
        axios.get(REACT_APP_URL + '/pebble')
        .then(({data}) => {
            setPebbles(data);
        })
        .catch(err => {console.log(err)})
    },[]);

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

    },[]);


    const styles = StyleSheet.create({
        map: {
          ...StyleSheet.absoluteFillObject,
          flex: 1
        },
      });

    return(
        <SafeAreaView style={styles.map}>
            {currentPosition &&
                <>
                    <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: currentPosition.lat,
                        longitude: currentPosition.lng,
                        latitudeDelta: LATITUD_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    >
                        
            
                   {pebbles && 
                    <>
                         {pebbles.map((marker) => (
                            <Marker
                                key={marker._id}
                                coordinate={{ latitude : marker.Position.lat , longitude : marker.Position.lng }}
                                title={marker.Label}
                            />
                        ))}
                    </>
                   
                   }
                  
                   
                    </MapView>
                </>
            }
        </SafeAreaView>
    );
};
export default PebbleMapAll;