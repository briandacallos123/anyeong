import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import {getPost} from './GetData'

const Post = () => {
    const [searchData, setSearchField] = useState("")

    const find = () => {    
        
        const {data} = getPost(searchData)
        console.log(data);
    }
    return (
        <View>
             <TextInput
                style={styles.textInput}
                onChangeText={(e)=>setSearchField(e)}   
                placeholder="Find User"
                value={searchData}
            />
            <Button
            title="find"
            onPress={find}
            />
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    textInput:{
        borderColor:'black',
        borderWidth:1.2,
        width:150
    }
})
