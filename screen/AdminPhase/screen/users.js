import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, TouchableOpacityBase, ScrollView, Alert} from 'react-native'

import User from './loadDataScreens/user'
import { firestore } from '../../../firebase'
import Userz from './searchData/User'
import Header from '../../Parts/header'
import {myIndex} from './searchData/User'


const Users = () => {
    const [data, setMyData] = useState([])
    const [index, setIndex] = useState(0)
    const myRef = useRef()
    // 
    const [dataMo, setData] = useState("")
    const [noData, setNoData] = useState(false)
    const [searchField, setSearchField] = useState("")
    const [edit, setEdit] = useState(true)
    const [editVar, setEditVar] = useState(false)
    const [myD, setD] = useState(0)


    useEffect(()=>{
        firestore.collection('users').get().then((snapshot) => {
            let myArray = []
            snapshot.docs.forEach(doc => {
                myArray.push(doc.data())
            })
            setMyData(myArray)
            
        })
       
    },[index])

 

    const findUser = (e) => {
        firestore.collection("users").where("email", '==', searchField).get()
         .then(res => {
             res.forEach(doc => {
                 setData(doc.data())
                 if(dataMo){
                     setSearchField("")
                     setEdit(!edit)
                 }else{
                    setSearchField("")
                 }
                 console.log(dataMo);
                 
             })
         }).catch(()=>{
           console.log("wala");
         })
         
         
     }

     const addNewData = () => {
       myRef.current.focus()
     }

     const addData = () => {

     }

     const deleteUser = () => {
        firestore.collection('users').doc(dataMo.id).delete()
        setIndex(index + 1)

        Alert.alert("Successfully Deleted")
        setData("")
    }
    console.log("Index to: ", index);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                {/* Search Data */}
                <View>
                <View style={styles.subContainer}>
           
           {/* search field */}
                    <View style={styles.search}>
                        <TextInput
                        placeholder="Find user email:"
                        style={styles.textInput}
                        value={searchField}
                        onChangeText={(e)=>{
                            setSearchField(e)
                            
                        }
                        }
                        />
                        <TouchableOpacity style={styles.opa} onPress={findUser}> 
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        marginTop:5
                    }}>
    
                    {dataMo ? 
                        <View style={{flexDirection:'row'}}>
                           <View>
                            <View>
                                    <Text>Name: {dataMo.name}</Text>
                                </View>
                                <View>
                                    <Text>Age: {dataMo.age}</Text>
                                </View>
                                <View>
                                    <Text>Yr&Sec: {dataMo.section}</Text>
                                </View>
                                <View>
                                    <Text>Course: {dataMo.course}</Text>
                                </View>
                                <View>
                                    <Text>Email: {dataMo.email}</Text>
                                </View>
                                <View>
                                    <Text>Password: {dataMo.password}</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={{marginBottom:5}}>
                                    <Text style={styles.btn}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteUser}>
                                    <Text style={styles.btn}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        :
                        <View>
                            {/* <TouchableOpacity>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>Delete</Text>
                            </TouchableOpacity> */}
                        </View>
                    }
                   
                       
                        
                    </View>
                    {/* <View style={{
                        width:280,
                        padding:10
                    }}>
                        <View style={styles.ewan}>
                            <Text>Name: </Text>
                            <TextInput
                            value={dataMo.name}
                            ref={myRef}
                            style={{
                                borderColor:'black',
                                borderWidth:1,
                                borderRadius:5,
                                width:120,
                                padding:5
                            }}
                            multiline
                            />
                            <TouchableOpacity onPress={addNewData}>
                                <Text style={styles.btn}>Add</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ewan}>
                            <Text>Password: </Text>
                            <TextInput
                            style={{
                                borderColor:'black',
                                borderWidth:1,
                                borderRadius:5,
                                width:120,
                                padding:5
                            }}
                            multiline
                            value={dataMo.password}
                            />
                                {dataMo ? <TouchableOpacity onPress={deleteUser}>
                                    <Text style={edit ? styles.isEdit:styles.btn }>Delete</Text>
                                </TouchableOpacity>:<Text></Text>}
                            
                        </View>
                       
                    </View> */}
                </View>
                </View>
                {/* <Userz/>  */}
                
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
               <ScrollView>
                {data.map((item, index) => {
                    //    console.log(item);
                    // console.log(item);
                // const {id, age, email, name, password} = item.item
                    return <User key={index} data={item}/>
                //     console.log(id);
                    })}
               </ScrollView>
               {/* <FlatList
                keyExtractor={(item, index)=> index}
                data={data}
                renderItem={(item)=>{
                    // console.log(item);
                       return <User data={item}/>
               }}
               />
                    */}
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
    },
    subContainer:{
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
    },
    textHeader:{
        marginBottom:5
    }
   

    
})
