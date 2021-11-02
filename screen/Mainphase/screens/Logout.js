import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {auth} from '../../../firebase'

const Logout = ({navigation}) => {
    React.useEffect(()=>{
        auth.signOut().then(()=>{
            console.log("Signed outt");
            navigation.navigate('Login')
        })
    },[])

    return (
        <View>
            
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({})
