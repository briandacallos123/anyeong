import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


const Index = ({props, settingAdmin}) => {
    const navigation = props

    const getMe = () => {
        navigation.navigate("AdminPanel")
    }
    return (
        <View>
          
             <MaterialIcons onPress={()=>settingAdmin()} name="admin-panel-settings" size={24} color="black" />
        </View>
    )
}

export default Index

const styles = StyleSheet.create({})
