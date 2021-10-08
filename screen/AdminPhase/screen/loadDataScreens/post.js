import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Post from '../searchData/Post'

const Poste = ({dataz}) => {
    const {title, body, id} = dataz.item
   
    return (
        <View>
            <Post/>
            <TouchableOpacity>
                <Text>Title:{title} </Text>
                <Text>Id: {id}</Text>
            </TouchableOpacity>
        </View>

    )
}

export default Poste

const styles = StyleSheet.create({})
