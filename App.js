import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, InteractionManager } from 'react-native';



const Stack = createNativeStackNavigator()

import Login from './screen/LoginPhase/Index';
import Register from './screen/Register/Index';
import Profile from './screen/Profile/Index';
import ItoDapat from './screen/Mainphase/ItoDapat';
import Admin from './screen/AdminPhase/Index'
import AdminPanel from './screen/AdminPhase/AdminPanel';
import Welcome from './screen/LoginPhase/Welcome';
import Forget from './screen/LoginPhase/Recover'

export default function App(){
  useEffect(()=>{
    trigMe()
  },[])
  function trigMe(){
   
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }
    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };
  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };
  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}
  }


  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          
          
       
        
        <Stack.Screen name="Welcome" component={Welcome}/>
        
        <Stack.Screen name="AdminPanel" component={AdminPanel}/>
          <Stack.Screen name="Admin" component={Admin}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="ItoDapat" component={ItoDapat}/>
          <Stack.Screen name="Forget" component={Forget}/>
          
          

          
          
      </Stack.Navigator>
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({

})
