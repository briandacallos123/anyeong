import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput,Modal, TouchableHighlight, Alert, TouchableOpacity} from 'react-native'
// import { auth } from '../../config';
import firebase from 'firebase';
import {auth, firestore} from '../../firebase'

import ItoDapat from '../Mainphase/ItoDapat'
import Header from '../Parts/header';
import Footer from '../Parts/footer';
import SocialIcon from '../Parts/SocialIcon';
import { Dimensions } from 'react-native'



const Form = ({props, dataz}) => {
    const [height, setHeight] = useState(0);
    const navigation = props
    const data = dataz
    const [isAdmin, setAdmin] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [myData, setMyData] = useState([]);
    const [info, setInfo] = useState({
        email:"",
        password:""
    })
    
    const settingAdmin = () => {
        setModalVisible(true);
        setAdmin(!isAdmin)
    }
    
    
    React.useEffect(()=>{
        const haytz = Math.round(Dimensions.get('window').height)
        setHeight(haytz)
       
      }, [])

   
    // modal
      const MyModal = () => {
        return(
            <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {isAdmin ? <Text style={styles.modalText}>You're trying to login as an Admin.</Text>:<Text style={styles.modalText}>You're trying to login as a User</Text>}
      
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Ok</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
      
            
          </View>
        )
      }

    const guest = () => {

        navigation.navigate('ItoDapat',{guest:true});
    }
      
           
  
     
    const login = () => {
                

            if(info.email && info.password){
                try{
                    auth.signInWithEmailAndPassword(info.email, info.password)
                    .then((response)=>{
                    setInfo({
                        email:"",
                        password:""
                    })
                    
                    firestore.collection('users').where('email','==',info.email).get().then((snapshot)=>{
                        if(isAdmin){
                    
                            // navigation.navigate("Main")
                            const uid = response.user.uid
                            const email = response.user.email
                            // search admin credentials in firestore
                            firestore.collection("admin").where("email", '==', email).get()
                            .then(res => {
                                res.forEach((err) => {
                                    Alert.alert("Welcome Admin")
                                    navigation.navigate('AdminPanel')
                                    
                                })
                            })
                           
                            }else{
                               firestore.collection("users").where("email", '==', info.email).get()
                                .then(res => {
                                    const myData = []
                                    res.forEach(doc => {
                                        
                                        myData.push(doc.data());
                                    })
                                    navigation.navigate('ItoDapat',{
                                        screen:'Profile',
                                        params:myData
                                    })
                                    
                                }).catch()
            
                               
                            }
                    })
                   
                   
                }).catch(err=>{
                    Alert.alert("No record found.")
                })
                }catch(e){
                   Alert.alert("ewan")
                }
                
            }
      
        
    }
    
    const register = () => {
        navigation.navigate("Register")
    }
    
    const forgot = () => {
        navigation.navigate('Forget')
    }
  
    return (
        <View style={{
              backgroundColor:'#D5EAF3',
                height:height,
                padding:20,
                
                
            }}>
                <View style={{
                    flex:1,
                    justifyContent:'center'
                }}>
                {/* header */}
                <Header/>
                <View style={styles.container}>
                
                
             
                {/* main container form */}
        <View style={{padding:10}}>
            <View style={styles.mainDiv}>
                    {isAdmin && <View style={{alignItems:'center'}}>
                        <View style={{width:120, backgroundColor:'#02215A',height:3}}></View>
                        <Text style={{color:'#02215A', fontSize:17,fontWeight:'bold'}}>ADMIN</Text>
                    </View>}
                    <View style={styles.textInputs}>
                       <MyModal/>
                        <TextInput
                        placeholder="Email"
                        style={styles.textInput1}
                        onChangeText={(e)=>setInfo({...info, email:e})}
                        value={info.email}
                        />
                    
                        <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={(e)=>setInfo({...info, password:e})}
                        value={info.password}
                        />
                    </View>
                    <View style={styles.guestDiv}>
                        <Text style={styles.text}>Login As <Text style={styles.guest1} onPress={guest}>Guest</Text></Text>
                        <Text style={styles.text}>Forgot <Text style={styles.guest} onPress={forgot}>Password?</Text></Text>
                    </View>
                    <View style={styles.buttons}>
                  
                    <TouchableOpacity onPress={login}>
                        <Text style={styles.btnLogin}>LOGIN</Text>
                    </TouchableOpacity>
                    {!isAdmin && <TouchableOpacity onPress={register}>
                        <Text style={styles.btnSignup}>SIGN UP</Text>
                    </TouchableOpacity>}
                    </View>
                </View>
            </View>

            </View>
          
            <Footer/>
        </View>
      
            <SocialIcon settingAdmin={settingAdmin}/>
        </View>
    )
   
}

export default Form

const styles = StyleSheet.create({
    
    container:{
        marginBottom:10
    },  
    
   
    mainDiv:{
      
        backgroundColor:'white',
        padding:20,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,

         

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    textInputs:{
        marginBottom:20,
        position:'relative',
        zIndex:1
    },
    textInput:{
        borderBottomColor:'black',
        borderBottomWidth:1,
        fontWeight:'normal',
        fontSize:15,
        padding:5,
    },        
    textInput1:{
        borderBottomColor:'black',
        borderBottomWidth:1.5,
        fontWeight:'normal',
        fontSize:15,
        padding:5,
        marginBottom:10
    },
   
    guestDiv:{
        padding:20,
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:20
    },
    guest:{
        color:'#00B2FF',
        fontSize:15
    },
    guest1:{
        color:'#00B2FF',
        fontSize:15,
        
      
    },
    text:{
        fontSize:15
    },
    btnLogin:{
        backgroundColor:'#02215A',
        color:'white',
        padding:15,
        fontWeight:'bold',
        textAlign:'center',
        fontSize:15,
        marginBottom:10
    },
    btnSignup:{
        backgroundColor:'#e8e9ef',
        color:'black',
        padding:15,
        fontWeight:'bold',
        textAlign:'center',
        fontSize:15
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: '#02215A',
        borderRadius: 20,
        padding: 40,
        paddingTop:10,
        paddingBottom:10,
        
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:'white',
        fontSize:15
      },
})
