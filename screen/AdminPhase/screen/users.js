import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableOpacityBase} from 'react-native'

import User from './loadDataScreens/user'
import { firestore } from '../../../firebase'
import Userz from './searchData/User'
import Header from '../../Parts/header'
import {myIndex} from './searchData/User'

const Users = () => {
    const [data, setData] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(()=>{
        firestore.collection('users').get().then((snapshot) => {
            let myArray = []
            snapshot.docs.forEach(doc => {
                myArray.push(doc.data())
            })
            setData(myArray)
            
        })
       
    },[])
    console.log("Rendereing");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                {/* Search Data */}
                <Userz/> 
                
                <View>
                    <TouchableOpacity style={{
                        backgroundColor:'#012362',
                        width:120,
                        padding:10,
                        marginTop:10,
                        borderRadius:10
                    }}>
                        <Text style={{
                            fontSize:15,
                            fontWeight:'bold',
                            color:'white'
                        }}>Show All User</Text>
                    </TouchableOpacity>
                </View>
               <FlatList
                data={data}
                renderItem={(item)=>{
                    // console.log(item);
                       return <User data={item}/>
               }}
               />
                   
            </View>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:'white',
        flex:1
    },
    header:{
        flex:1
    }

    
})
