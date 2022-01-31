import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import UserList from './src/components/user/user-list/user-list';
import UserRegister from './src/components/user/user-register/user-register';
import UserLogin from './src/components/user/user-login/user-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {end, start} from './src/store/sessionSlice'
import jwtDecode from 'jwt-decode';
import PebbleCreate from './src/components/pebble/pebble-create/pebble-create';
import UserAccount from './src/components/user/user-account/user-account';
import PebbleMapAll from './src/components/pebble/pebble-map-all/pebble-map-all';
import Home from './src/components/home/home';



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
      {isLogged &&<DrawerItem label="Déconnexion" onPress={() => {
        props.navigation.closeDrawer();
        dispatch(end());
        singOut(); 
        }} />}
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  const session = useSelector(state => state.session);
  const isLogged = session.isLogged;
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} options={{drawerLabel: 'Acceuil' }} />
        <Drawer.Screen name="Map pebble" component={PebbleMapAll} options={{drawerLabel: 'Voir tout les galets' }}/>
        {isLogged && 
          <>
            <Drawer.Screen name="Pebble" component={PebbleCreate} options={{drawerLabel: 'Ajouter un galet' }}/>
            <Drawer.Screen name="account" component={UserAccount} options={{drawerLabel: 'Votre compte' }}/>
            {session.user.UserRoles.includes("Admin") && 
              <>
                <Drawer.Screen name="User" component={UserList} options={{drawerLabel: 'Liste utilisateurs' }}/>
              </>
            }
          </>

        }
        
        {!isLogged && 
          <>
            <Drawer.Screen name="Register" component={UserRegister} options={{drawerLabel: 'Inscription' }} />
            <Drawer.Screen name="Login" component={UserLogin} options={{drawerLabel: 'Connexion' }}/>
          </>
        }
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
