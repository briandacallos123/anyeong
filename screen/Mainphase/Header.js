import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.logo}>CMU NOW</Text>
                <View style={styles.line}></View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
    },
    innerContainer:{
        flexDirection:'row',
        padding:5,
       
    },
    logo:{
        color:'#012362',
        fontSize:30,
        marginRight:10

    },
    line:{
        height:40,
        width:3,
        backgroundColor:'black'
    }
})
