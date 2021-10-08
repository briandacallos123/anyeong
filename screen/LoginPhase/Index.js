import React from 'react'
import { StyleSheet, Text, View, Dimension } from 'react-native'
// component
import Form from './form'
import Admin from '../AdminPhase/Index'

export default function Login({navigation}){
   const [isAdmin, setAdmin] = React.useState(false)


   const settingAdmin = () => {
     setAdmin(true)
   }

  

    return (
        <View style={{
          
        }}>
          
          <Form props={navigation} dataz={isAdmin}/>
          {/* <Admin props={navigation} settingAdmin={settingAdmin}/> */}
         
        </View>
    )
}



const styles = StyleSheet.create({
  container:{
    
  }
})
