import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import AppStackScreen from './src/stack/AppStackScreen'

import {UserProvider} from './src/context/UserContext'
import {FirebaseProvider} from './src/context/FirebaseContext' 


export default function App() {
 console.log("the app is up and running")
  return (
   <FirebaseProvider>
     <UserProvider>
   <NavigationContainer>
      <AppStackScreen/>
    </NavigationContainer> 
    </UserProvider>
    </FirebaseProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
