import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Form from './form'

export default function Register({navigation}){
    return (
        <View style={styles.container}>
          <Text>Register Now</Text>

          <Form props={navigation}/>
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
