import React from "react"
import {createStackNavigator } from '@react-navigation/stack'


import SigninScreen from '../screens/SigninScreen'
import SignupScreen from '../screens/SignupScreen'

export default AuthStackScreens = ()=>{
   const AuthStack = createStackNavigator()
   
    return (
      <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen name="SignUp" component ={SignupScreen}/>
        <AuthStack.Screen name="SignIn" component ={SigninScreen}/>
      </AuthStack.Navigator>
    )
}