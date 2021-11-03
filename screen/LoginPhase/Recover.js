import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import Header from '../Parts/header'
import { getAuth, sendPasswordResetEmail } from '../../firebase'


const Forget = ({navigation}) => {
    const [submitted, setSubmitted] = useState(false)
    const [email, setEmail] = useState("");
    
    const submit = () => {
        if(email){

            setSubmitted(true)
            sendVerification()
            setEmail("")
            retToLogin()

        }else{
            Alert.alert("Please specify your email")
        }
        
    }
    const sendVerification = () => {
        const auth = getAuth;
        sendPasswordResetEmail(email, auth)
          .then(() => {
            // Password reset email sent!
            // ..
            console.log("success");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }
    const retToLogin = () => {
        setTimeout(()=>{
            navigation.navigate("Login")
        },5000)
    }
    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.subContainer}>
                {submitted && <Text style={styles.texi}>You will be notified on your email address  regarding to your password. </Text>}
                {!submitted && <Text style={styles.texi}>Enter your Email</Text>}
                {!submitted &&  <TextInput value={email} onChangeText={(e)=>{
                    setEmail(e)
                }} style={styles.textField}/>}
            </View>
           {!submitted && 
           
           <View style={{justifyContent:'center',
           alignItems:'center', marginTop:50}}>
              
               <TouchableOpacity onPress={submit} style={styles.btn}>
                   <Text style={{ color:'white'}}>Submit</Text>
               </TouchableOpacity>
       </View>}
        <View style={{paddingTop:50, justifyContent:'center', alignItems:'center'}}>
             {submitted && <Text style={styles.text}>Thank you...</Text>}
        </View>
        </View>
    )
}

export default Forget

const styles = StyleSheet.create({
    container:{
        padding:30,
    },
    btn:{
        backgroundColor:'#012362',
        padding:10,
       
    },
    subContainer:{
        marginTop:50
    },
    text:{
        fontWeight:'bold',
        fontSize:17
    },
    texi:{
        fontWeight:'normal',
        marginTop:50,
        fontSize:15
    },
    textField:{
        borderBottomColor:'black',
        borderBottomWidth:1
    }
})
