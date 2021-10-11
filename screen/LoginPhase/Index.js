import React from 'react'
import { StyleSheet, Text, View, Dimension } from 'react-native'
// component
import Form from './form'
import Admin from '../AdminPhase/Index'

export default function Login({navigation}){
   const [isAdmin, setAdmin] = React.useState(false)

    return (
        <View>
          <Form props={navigation} />
          {/* <Admin props={navigation} settingAdmin={settingAdmin}/> */}
         
        </View>
    )
}



const styles = StyleSheet.create({
  container:{
    
  }
})
