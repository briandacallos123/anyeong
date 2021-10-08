import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Post = ({data}) => {
    const {title, body} = data
    console.log(typeof(data));
    return (
        <View style={styles.container}>
            <Text>Title: {title}</Text>
            <Text>Body: {body}</Text>
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container:{
        marginBottom:10
    }
})
