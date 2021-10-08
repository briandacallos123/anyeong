import React from 'react'
import { StyleSheet, Text, View, Icon } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// icons


const Tab = createBottomTabNavigator();
// component
import Users from './screen/users'
import Admin from './screen/admin'
import Post from './screen/post'

const AdminPanel = () => {
    return (
     
           <Tab.Navigator screenOptions={{headerShown:false}}>
               <Tab.Screen name="user" component={Users}/>
               <Tab.Screen name="admin" component={Admin}/>
               <Tab.Screen name="Post" component={Post}/>
           </Tab.Navigator>
       
    )
}

export default AdminPanel

const styles = StyleSheet.create({})
