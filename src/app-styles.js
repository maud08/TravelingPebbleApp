import * as React from 'react';
import {StyleSheet} from 'react-native';

const stylesApp = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    title: {
      fontSize: 30,
    },
    title2: {
      fontSize: 20,
    },
    content: {
      marginVertical: 20
    },
    viewBtn:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#c2c2c2'
    },
    viewSend:{
      marginTop: 20
    },
    list:{
      marginTop:10
    }
  });

  export default stylesApp

