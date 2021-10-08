import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Header from '../../Mainphase/Header'
import { AntDesign } from '@expo/vector-icons';

const Admin = () => {
    return (
        <View>
           {/* header */}
           <Header/>
           <View style={styles.container}>
           <TextInput
                style={styles.textInput}
                onChangeText={(e)=>setSearchField(e)}
                placeholder="Find User"
               
                />
               
               <TouchableOpacity style={styles.search}>
                    <AntDesign name="search1" size={24} color="black" />
                    <Text style={styles.search}>Search</Text>
               </TouchableOpacity>
           </View>

           
        </View>
    )
}

export default Admin

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:10,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    textInput:{
        borderColor:'black',
        borderWidth:1.2,
        width:150,
        marginRight:10,
        padding:5
    },
    search:{
        backgroundColor:'#cfe4ed',
        padding:3,
        fontSize:15,
        flexDirection:'row',
        alignItems:'center'
    },
})
