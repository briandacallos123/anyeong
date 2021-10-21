import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Alert} from 'react-native'
import Header from '../../Parts/header'
import { firestore, auth, deleteUser} from '../../../firebase'
// let admin = require('firebase-admin')

import {retId} from './Profile'

const height = Math.round(Dimensions.get('window').height)

const Setting = ({route, navigation}) => {
    // console.log(guestTrue);

    const [isEdit, setEdit] = useState(false);
    const [isDeleteAccount, setDeleteAccount] = useState(false);
    const [isLogout, setLogout] = useState(false);
    const [delValidate, setDelValidate] = useState(false)
   
    const name = useRef("")
    const id = retId()
    const [info, setInfo] = useState({
        name:"",
        age:"",
        studentNumber:"",
        course:""
    })
    

    const UpdateComponent = () => {
          
        
        // dacallosbrian123@gmail.com
     
    }
    const update = () => {
        setEdit(!isEdit)
        setDeleteAccount(false)
        setLogout(false)
    }

    const updateData = () =>{
        if(info.name && info.age && info.studentNumber && info.course){
            firestore.collection('users').doc(id).update({
                name:info.name,
                age:info.age,
                studentNumber:info.studentNumber,
                course:info.course,
            })
            Alert.alert("You need to login again to apply changes.")
            navigation.navigate("Login")
        }else{
            Alert.alert("All fields are required")
        }
    }
    const logout = () => {
        setLogout(!isLogout)
        setEdit(false)
        setDeleteAccount(false)
    }
    const logoutReal = () => {
        auth.signOut().then(()=>{
            console.log("Signed outt");
            navigation.navigate('Login')
        })
    }
    const delAccount = () => {
        setDeleteAccount(!isDeleteAccount)
        setEdit(false)
        setLogout(false)
    }
    const delMyAccount = () =>{

        
        firestore.collection('users').doc(id).delete()
        .then((res) => {
            Alert.alert("Delete Account Successful")
            auth.signOut().then(()=>{
                console.log("Signed outt");
                navigation.navigate('Login')
            })
        })
       
    }
    return (
       <View style={styles.container}>
           <Header/>
           <View style={styles.btn}>
               <TouchableOpacity style={styles.opa} onPress={update}>
                   <Text style={styles.text}>Update Profile</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.opa} onPress={delAccount}>
                   <Text style={styles.text}>Delete Account</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.opa} onPress={logout}>
                   <Text style={styles.text}>Logout</Text>
               </TouchableOpacity>
           </View>
           <View>
               {isEdit &&  <View style={{
                    padding:15
                }}>
                     
                     <TextInput
                        placeholder="Name"
                        style={styles.textInput1}
                        onChangeText={(e)=>setInfo({...info, name:e})}
                    />
                     <TextInput
                        placeholder="Age"
                        style={styles.textInput1}
                        onChangeText={(e)=>setInfo({...info, age:e})}
                    />
                     <TextInput
                        placeholder="Student#"
                        style={styles.textInput1}
                        onChangeText={(e)=>setInfo({...info, studentNumber:e})}
                    />
                     <TextInput
                        placeholder="Course"
                        style={styles.textInput1}
                        onChangeText={(e)=>setInfo({...info, course:e})}
                    />
                    <TouchableOpacity onPress={updateData}>
                        <Text style={{
                            alignSelf:'flex-end',
                            fontSize:15,
                            backgroundColor:'#012362',
                            color:'white',
                            padding:7
                        }}>Submit</Text>
                    </TouchableOpacity>
                </View>}
                {isDeleteAccount && 
                    <View style={{padding:20,paddingTop:70}}>
                        <Text style={{fontSize:15}}>Do you really want to <Text style={{color:'red'}} >DELETE</Text> your account ?</Text>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            padding:20
                        }}>
                            <TouchableOpacity style={{marginRight:20}} onPress={delMyAccount}>
                                <Text style={{color:'red',fontSize:17}}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>No</Text>
                            </TouchableOpacity>
                        </View>  
                    </View>
                }
                {isLogout && 
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    paddingTop:50
                }}>
                    <TouchableOpacity onPress={logoutReal}>
                        <Text style={{padding:10, color:'#012362', fontSize:17}}>Confirm Logout</Text>
                    </TouchableOpacity>
                </View>    
                }
                {/* {delValidate && 
                 <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    paddingTop:50
                }}>
                    <TouchableOpacity onPress={delMyAccount}>
                        <Text style={{padding:10, color:'#012362', fontSize:17}}>Confirm deletion</Text>
                    </TouchableOpacity>
                </View>   
                } */}
           </View>
       </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container:{
        height:height,
        padding:20
    },
    opa:{
        backgroundColor:'#012362',
       
    },
    btn:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    text:{
        color:'white',
        padding:10
    },
    textInput1:{
        borderBottomColor:'black',
        borderBottomWidth:1.5,
        fontWeight:'normal',
        fontSize:15,
        padding:5,
        marginBottom:10
    },
})
