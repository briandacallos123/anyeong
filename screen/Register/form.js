import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native'
import { auth } from '../../config';
import firebase from 'firebase';
import Forme from './porm';

const Form = ({props}) => {
    const navigation = props
   
    const [info, setInfo] = useState({
        email:"",
        password:"",
        rePassword:"",
        name:"",
        age:""
    })


    const submit = () => {
        if(info.password == info.rePassword){
            firebase.auth().createUserWithEmailAndPassword(info.email, info.password)
            .then((res)=>{
                Alert.alert("You've sucessfully register")
                const uid = res.user.uid;
                const data = {
                    id:uid,
                    email:info.email,
                    password:info.password,
                    name:info.name,
                    age:info.age
                }
                const usersRef = firebase.firestore().collection('users')
                usersRef.doc(uid).set(data)
                .then(()=>{
                    Alert.alert("Success sa firestore")
                })
                .catch(()=>{
                    Alert.alert("Failed sa firestore")
                })
                navigation.navigate("Login")
            })
            .catch((e)=>{
                Alert.alert(e.message);
            })
                
             }
            
        }
    
    

    return (
        <View>
            <Forme/>
        </View>
    //     <View style={styles.container}>
    //         <View>
    //             <Text>Email:</Text>
    //             <TextInput
    //             style={styles.textInput}
    //             onChangeText={(e)=>setInfo({...info, email:e})}
    //             />
    //         </View>
    //         <View>
    //             <Text>Password:</Text>
    //             <TextInput
    //             style={styles.textInput}
    //             onChangeText={(e)=>setInfo({...info, password:e})}
    //             />
    //         </View>
    //         <View>
    //             <Text>Confirm Password:</Text>
    //             <TextInput
    //             style={styles.textInput}
    //             onChangeText={(e)=>setInfo({...info, rePassword:e})}
    //             />
    //         </View>
    //         <View>
    //             <Text>Name:</Text>
    //             <TextInput
    //             style={styles.textInput}
    //             onChangeText={(e)=>setInfo({...info, name:e})}
    //             />
    //         </View>
    //         <View>
    //             <Text>Age:</Text>
    //             <TextInput
    //             style={styles.textInput}
    //             onChangeText={(e)=>setInfo({...info, age:e})}
    //             />
    //         </View>
    //         <View>
    //             <Button
    //             title="Login"
    //             onPress={submit}
    //             />
               
    //         </View>
            
    //     </View>
    // )
    )
}

export default Form

const styles = StyleSheet.create({
    // container:{
    //     flex:1,
    //     justifyContent:'center',
    //     alignItems:'center',
       
    //   },
    // textInput:{
    //     borderColor:'black',
    //     borderWidth:2,
    //     width:200,
    //     padding:10
    // }
})
