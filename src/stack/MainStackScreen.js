import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator } from '@react-navigation/stack'
import {Ionicons} from '@expo/vector-icons'

import UserListScreen from '../screens/UserListScreen'
import HomeScreen from '../screens/HomeScreen'
import UserDetailScreen from '../screens/UserDetailScreen'
import StatsScreen from '../screens/StatsScreen'


export default MainStackScreen = ()=>{
    const MainStack= createBottomTabNavigator()
    

    const tabBarOptions ={
        showLabel:false,
        style:{
            backgroundColor:"#222222",
            paddingBottom:12
        }
    }

    const screenOptions =({route})=>({
        tabBarIcon: ({focused})=>{
            let iconName="ios-home"
    
            switch(route.name) {
                case "Home":
                    iconName="ios-home"
                    break;
                case "stats":
                    iconName="ios-cellular-sharp"
                    break; 
                case "List":
                    iconName="ios-person"
                break; 
                default:
                    iconName="ios-home"
            }
           

            if(route.name==="Detail"){
                return null
            }
         
            return <Ionicons name={iconName} size={24} color={focused ? "#ffffff": "#666666"}/>
          

        }
      })


      return (
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
             <MainStack.Screen name="List" component={UserListScreen}/>
            <MainStack.Screen name="home" component={HomeScreen}/>
            <MainStack.Screen name="stats" component={StatsScreen}/>
            <MainStack.Screen name="Detail" component={UserDetailScreen}/>
          
        </MainStack.Navigator>

       
    )
}

