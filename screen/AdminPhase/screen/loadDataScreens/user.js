import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'

export default function({data}){
    const {id, age, email, name, password} = data

    return (
        <View>
            <Text>Email: {email}</Text>
            
        </View>
    )
}



const styles = StyleSheet.create({})
