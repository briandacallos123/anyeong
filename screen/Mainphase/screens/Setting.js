import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Keyboard,TouchableWithoutFeedback, TextInput, Dimensions, Alert} from 'react-native'
import Header from '../../Parts/header'
import { firestore} from '../../../firebase'
// let admin = require('firebase-admin')
import {retId,} from './Profile'
import {retEmail} from './Profile'
import {auth} from '../../../firebase'

const user = firestore.currentUser

const height = Math.round(Dimensions.get('window').height)

const Setting = ({route, navigation}) => {
    

    const [isEdit, setEdit] = useState(false);
    const [isDeleteAccount, setDeleteAccount] = useState(false);
    const [isLogout, setLogout] = useState(false);
    const [delValidate, setDelValidate] = useState(false)
    const [isHelp, setIsHelp] = useState(false)
    const [helpz, setHelp] = useState("")
    const [sendHelp, setSendHelp] = useState(false)
    const name = useRef("")
    const id = retId()
    
    const [info, setInfo] = useState({
        name:"",
        age:"",
        studentNumber:"",
        course:""
    })
    // console.log("wow", auth.currentUser.email);
    
    const checkHelp = () => {
        if(helpz.length > 10){
            setSendHelp(true)
            setDeleteAccount(false)
            setIsHelp(false)
            setLogout(false)
            setEdit(false)
            setHelp(false)
            submitHelp()
        }else{
            Alert.alert("Please specify your concern")
        }
    }
    const submitHelp = () => {
        firestore.collection('concerns').add({
            report:{
                email:retEmail(),
                issue:helpz
            }
        })
    }
    const deleteAuthAccount = () => {
        const user = auth.currentUser;

        user.delete().then(() => {
          Alert.alert("Account deleted succesfully.")
          navigation.navigate("Login")
        }).catch((error) => {
          
        });
    }

    const delAccount = () => {
        setDeleteAccount(!isDeleteAccount)
        setIsHelp(false)
        setLogout(false)
        setEdit(false)
        setHelp(false)
        setSendHelp(false)
    }

  
    const update = () => {
        setEdit(!isEdit)
        setDeleteAccount(false)
        setLogout(false)
        setIsHelp(false)
        setHelp(false)
        setSendHelp(false)
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
        setIsHelp(false)
        setHelp(false)
        setSendHelp(false)
    }
    const logoutReal = () => {
        auth.signOut().then(()=>{
            console.log("Signed outt");
            navigation.navigate('Login')
        })
    }
    const help = () =>{
        setIsHelp(!isHelp)
        setLogout(false)
        setEdit(false)
        setDeleteAccount(false)
        setHelp(false)
        setSendHelp(false)
    }
  
    // const delMyAccount = () =>{

        
    //     firestore.collection('users').doc(id).delete()
    //     .then((res) => {
    //         Alert.alert("Delete Account Successful")
    //         auth.signOut().then(()=>{
    //             console.log("Signed outt");
    //             navigation.navigate('Login')
    //         })
    //     })
       
    // }
    return (
      <TouchableWithoutFeedback
      onPress={()=>{
          Keyboard.dismiss()
      }}
      >
           <View style={styles.container}>
           <Header/>
           <View style={styles.btn}>
               <TouchableOpacity style={styles.opa} onPress={update}>
                   <Text style={styles.text}>Update</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.opa} onPress={delAccount}>
                   <Text style={styles.text}>Delete</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.opa} onPress={help}>
                   <Text style={styles.text}>Help</Text>
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
                            <TouchableOpacity style={{marginRight:20}} onPress={deleteAuthAccount}>
                                <Text style={{color:'red',fontSize:17}}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={delAccount}>
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
                    <Text style={{fontSize:15}}>Logging Out ?</Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={logoutReal}>
                            <Text style={{padding:10, color:'#012362', fontSize:17, color:'red'}}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logout}>
                            <Text style={{padding:10, fontSize:17, color:'#012362'}}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
                }
                {isHelp && <View style={{padding:15, paddingTop:30}}>
                    <Text style={{
                        fontWeight:'normal',
                        fontSize:15,
                        color:'#012362'
                        }}>Enter your concerns</Text>    
                    {/* <View style={{flexDirection:'row',marginBottom:20, alignItems:'center',paddingTop:10}}>
                        <Text style={{marginRight:10}}>Concern Title: </Text>
                        <TextInput style={{borderBottomColor:'black',borderBottomWidth:2, width:120}}></TextInput>
                    </View>  */}
                    <TextInput
                    multiline
                    style={{
                        borderBottomWidth:1,
                        borderBottomColor:'black'
                    }}
                    onChangeText={(e)=>setHelp(e)}
                    ></TextInput>
                    <View style={{
                        alignItems:'flex-end'
                    }}>
                        <TouchableOpacity style={{width:80, backgroundColor:'#012362',marginTop:10,borderTopRightRadius:15}} onPress={checkHelp}>
                            <Text style={
                                {color:'white',padding:10, textAlign:'center'}
                                
                                }>Send</Text>
                        </TouchableOpacity>
                    </View>
                   
                </View>
                }
                <View style={{padding:90}}>
                {sendHelp ? <Text style={{fontWeight:'bold'}}>We will notify you as soon as possible, Thank you.</Text>:<Text></Text>}
                </View>
               
           </View>
       </View>
      </TouchableWithoutFeedback>
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
        width:80,
        justifyContent:'center',
        alignItems:'center',
        borderTopRightRadius:10
    },
    btn:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between'
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
