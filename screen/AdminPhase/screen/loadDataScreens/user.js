import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default function({data}){
    const {id, age, email, name, password} = data


    return (
        <View>
            <Text>Email: <Text style={{fontSize:14,fontWeight:'bold'}}>{email}</Text></Text>
            
        </View>
    )
}



const styles = StyleSheet.create({})
