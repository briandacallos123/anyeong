import React,{useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from '../Images/User.png'
// icons
import { FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

// component
import NewsUpdates from './screens/NewsUpdates'
import Profile from './screens/Profile'
import Setting from './screens/Setting'
import About from './screens/About'

const ItoDapat = ({route, navigation}) => {
    const {guest} = route.params
    const [guestTrue, setGuest] = useState(guest);


 
    if(guestTrue){
        return(
            <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle: { backgroundColor:'#012362'}}}>
                <Tab.Screen name="NewsUpdates" component={NewsUpdates}/>
                <Tab.Screen name="About" component={About}/>
                <Tab.Screen name="Setting" component={Setting} navigation={navigation} guestTrue={guestTrue}/>
            </Tab.Navigator>
        )
    }
  
        return(
            <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle: { backgroundColor:'#012362'}}}>
                <Tab.Screen name="NewsUpdates" component={NewsUpdates}/>
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="About" component={About}/>
                <Tab.Screen name="Setting" component={Setting} navigation={navigation}/>
            </Tab.Navigator>
        )
    
    
}

export default ItoDapat

const styles = StyleSheet.create({})
