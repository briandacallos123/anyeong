import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Header from '../../Parts/header'
import { AntDesign } from '@expo/vector-icons';
import { firestore } from '../../../firebase';
import Admins from './loadDataScreens/admin'

const Admin = () => {
    const [data, setData] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(()=>{
        firestore.collection('admin').get().then((snapshot) => {
            let myArray = []
            snapshot.docs.forEach(doc => {
                myArray.push(doc.data())
            })
            setData(myArray)
        })
    },[index])

    return (
        <View>
           {/* header */}
           <Header/>
           {/* search */}
           <View style={styles.Sub}>
                    
                    {/* search field */}
                    <View style={styles.search}>
                        <TextInput
                        placeholder="Search Post: "
                        style={styles.textInput}
                        
                        />
                        <TouchableOpacity> 
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                   
                </View>
            <View style={styles.container}>
           </View>
           <Text style={{
                backgroundColor:'#012362',
                color:'white',
                padding:5,
                width:120,
                fontSize:17,
                fontWeight:'bold',
                textAlign:'center',
                borderRadius:10
            }}>All Admin</Text>

            {/* {data.map((item))} */}
            {data.map((item, index)=>{
                return <Admins key={index} dataz={item}/>
            })}
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
  
    Sub:{
        padding:10,
        justifyContent:'flex-end',
        alignItems:'center',
        width:320,
      
        alignSelf:'flex-end',
        backgroundColor:'#f7f7f7',
        borderRadius:15
    },
    search:{
        padding:3,
        fontSize:15,
        fontWeight:'bold',
        flexDirection:'row',
        alignItems:'center'
    },
    textInput:{
        borderColor:'#012362',
        borderWidth:1.5,
        width:200,
        marginRight:10,
        padding:5,
        borderRadius:10,
        paddingLeft:10
    },
    
})
