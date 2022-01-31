import * as React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
          <Text style={styles.title}>Les galets voyageurs</Text>
          <View style={styles.content}>
            <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a nisi dolor. Integer tempus sem ut nisl congue lacinia. 
            Vivamus sodales facilisis laoreet. Cras eleifend eros et elementum dictum. Vivamus in felis vitae lacus congue dignissim. 
            Praesent euismod in dui ac congue. Suspendisse quis lorem aliquam, imperdiet elit vel, venenatis urna. 
            Nullam sollicitudin dapibus nulla, aliquet eleifend sem posuere vitae. Mauris vel aliquam diam, vitae facilisis elit. 
            Curabitur convallis libero ut aliquam condimentum. Suspendisse et metus sollicitudin, tempus dolor malesuada, interdum velit. 
            Nam metus mi, vulputate nec pellentesque rutrum, 
            commodo ut ipsum. Morbi semper convallis felis vitae tristique. Nam vel luctus urna. Donec ut nisl sollicitudin, efficitur ligula vel, tempus sem.
            </Text>
          </View>
          <View style={styles.viewBtn}>
            <Button title="S'incrire" onPress={() => navigation.navigate('Register')}/>
            <Button title="Connexion" onPress={() => navigation.navigate('Login')}/>
            <Button 
            title="Carte des galets"
            onPress={() => navigation.navigate('Map pebble')}/>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
  },
  content: {
    marginVertical: 20
  },
  viewBtn:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Home;
