import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default function({data}){
    const {id, age, email, name, password} = data.item


    return (
        <View>
            <Text>Email: {email}</Text>
            
        </View>
    )
}



const styles = StyleSheet.create({})
