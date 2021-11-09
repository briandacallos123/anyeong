import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native'
import {getPost} from './GetData'

const Fost = () => {
    const [searchData, setSearchField] = useState("")

    // const find = () => {    
        
    //     const {data} = getPost(searchData)
    //     console.log(data);
    // }
    return (
        <View style={styles.container}>
           
        {/* search field */}
        <View style={styles.search}>
            <TextInput
            placeholder="Search Post:"
            style={styles.textInput}
            onChangeText={(e)=>{
                setSearchField(e)
                
            }
            }
            />
            <TouchableOpacity> 
                <Text>Search</Text>
            </TouchableOpacity>
        </View>
        <View style={{
            width:280,
            padding:10
        }}>
            <View style={styles.ewan}>
                <Text>Name: </Text>
                <TextInput
               
                />
                <TouchableOpacity>
                    <Text style={styles.btn}>Add</Text>
                </TouchableOpacity>
            </View>
{/* 
            <View style={styles.ewan}>
                <Text>Password: </Text>
                <TextInput
                value={dataMo.password}
                />
                    <TouchableOpacity onPress={deleteUser}>
                        <Text style={edit ? styles.isEdit:styles.btn }>Delete</Text>
                    </TouchableOpacity>
               
            </View> */}
            
        </View>
    </View>
    )
}

export default Fost

const styles = StyleSheet.create({
    container:{
        padding:10,
        justifyContent:'flex-end',
        alignItems:'center',
        width:320,
      
        alignSelf:'flex-end',
        backgroundColor:'#f7f7f7',
        borderRadius:15
    },
    btn:{
        padding:5,
        width:70,
        backgroundColor:'#012362',
        textAlign:'center',
        color:'white',
        position:'relative',
        right:-20
    },
    ewan:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:5
       
    },
    // opa:{
    //     backgroundColor:''
    // },
    textInput:{
        borderColor:'#012362',
        borderWidth:1.5,
        width:200,
        marginRight:10,
        padding:5,
        borderRadius:10,
        paddingLeft:10
    },
    search:{
        padding:3,
        fontSize:15,
        fontWeight:'bold',
        flexDirection:'row',
        alignItems:'center'
    },
    edit:{
        flexDirection:'row'
    },
    isEdit:{
        backgroundColor:'#65676a',
        padding:5,
        width:70,
        textAlign:'center',
        color:'white',
        position:'relative',
        right:-20
    }
})
