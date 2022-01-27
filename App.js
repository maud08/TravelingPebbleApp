import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/components/HomeScreen';
import DetailsScreen from './src/components/DetailsScreen';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import UserList from './src/components/user/user-list/user-list';
import UserRegister from './src/components/user/user-register/user-register';
import UserLogin from './src/components/user/user-login/user-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {end, start} from './src/store/sessionSlice'
import jwtDecode from 'jwt-decode';



const singOut = async () => {
  try {
    await AsyncStorage.clear();
  } catch(e) {
    console.log(e);
  }
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const isLogged = useSelector(state => state.session.isLogged);
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isLogged &&<DrawerItem label="Logout" onPress={() => {
        props.navigation.closeDrawer();
        dispatch(end());
        singOut(); 
        }} />}
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  const isLogged = useSelector(state => state.session.isLogged);
  return (
    <Drawer.Navigator initialRouteName="Login" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="User" component={UserList} />
        <Drawer.Screen name="Register" component={UserRegister} />
        {!isLogged && <Drawer.Screen name="Login" component={UserLogin} />}
    </Drawer.Navigator>
  );
}

function App() {
  const dispatch = useDispatch();

  //Permet de vérifier si il y a un token et mettre le store a jour si c'est le cas.
  //lors d'un reload je perdrai pas mon token 
  React.useEffect(() => {
    AsyncStorage.getItem('@storage_Token')
  .then(token=> {
    if(token){
      const user = jwtDecode(token);
      dispatch(start(user))
    }
  })
  },[])
  return (
    <NavigationContainer>
      <MyDrawer/>
    </NavigationContainer>
  );
}

export default App;
