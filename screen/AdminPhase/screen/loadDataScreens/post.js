import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Post from '../searchData/Post'

const Poste = ({dataz}) => {
    const {title, body, id} = dataz
   
    return (
        <View>
            <TouchableOpacity>
                <Text>Title: <Text style={{
                    fontSize:14,
                    fontWeight:'bold'
                    
                    }}>{title} </Text></Text>
            </TouchableOpacity>
        </View>

    )
}

export default Poste

const styles = StyleSheet.create({})
