import React, {useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Index = ({route, navigation}) => {
    const {id, emil} = route.params;
    

    // const log = async() => {
    //     let user = await auth.signInWithPopup();
    // }
    const goToMain = () => {
        navigation.navigate("Main")
    }
   

    return (
        <View style={styles.container}>
            <Text>Welcome to profile</Text>
            <Text>Your id: {id}</Text>
            <Text>Your Email: {emil}</Text>
            <Button
            title="Proceed"
            onPress={goToMain}
            />
            
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
