import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Forme from './porm'

export default function Register({navigation}){
    return (
        <View style={styles.container}>

          <Forme props={navigation}/>
        </View>
    )
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    
  }
})
