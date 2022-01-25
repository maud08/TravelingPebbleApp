import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import DetailsScreen from './src/components/DetailsScreen';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import UserList from './src/components/user/user-list/user-list';
import UserRegister from './src/components/user/user-register/user-register';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Register">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="User" component={UserList} />
        <Drawer.Screen name="Register" component={UserRegister} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
