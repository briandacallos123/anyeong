import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native'
import { auth } from '../../config';
import firebase from 'firebase';
import MainPhase from './../Mainphase/Index'
import Header from '../Parts/header';
import Footer from '../Parts/footer';
import SocialIcon from '../Parts/SocialIcon';
import { Dimensions } from 'react-native'



const Form = ({props, dataz}) => {
    const [height, setHeight] = React.useState(0);
    const navigation = props
    const data = dataz
    
    React.useEffect(()=>{
        const haytz = Math.round(Dimensions.get('window').height)
        setHeight(haytz)
        console.log(haytz);
      }, [])

    const [info, setInfo] = useState({
        email:"",
        password:""
    })
    
    

    const login = () => {
        
        if(data){
            console.log("It's true");
            if(info.email && info.password){
                firebase.auth().signInWithEmailAndPassword(info.email, info.password)
                .then((response)=>{
                    console.log("Admin nila log in nya pero check muna if nasa firestore yung data");
                    // navigation.navigate("Main")
                    const uid = response.user.uid
                    const email = response.user.email
                    console.log("Email niya: ", email)
    
                    // search admin credentials in firestore
                    firebase.firestore().collection("admin").where("email", '==', email).get()
                    .then(res => {
                        res.forEach((err) => {
                           navigation.navigate("AdminPanel")
                        })
                    })
                    .catch((e) => Alert.alert("Hindi siya admin!")) 
                   
                })
                .catch(e => {
                    Alert.alert(e.message)
                })
            }
        }else{
        console.log("It's false")
           if(info.email && info.password){
            firebase.auth().signInWithEmailAndPassword(info.email, info.password)
            .then((response)=>{
                // navigation.navigate("Main")
                const newData = {
                     id : response.user.uid,
                     emil :response.user.email
                }
                console.log("Hindi siya admin");
                navigation.navigate("Profile",newData)
            })
            .catch(e => {
                Alert.alert(e.message)
            })
        }
        }
    }
    const register = () => {
        navigation.navigate("Register")
    }
    // backgroundColor:'#E4E4E4',
    // height:height
    return (
        <View style={{
              backgroundColor:'#E4E4E4',
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
                
                {/* top blue */}
               

                {/* main container form */}
        <View style={{padding:10}}>
            <View style={styles.mainDiv}>
                    <View style={styles.textInputs}>
                        <TextInput
                        placeholder="Email"
                        style={styles.textInput1}
                        
                        />
                    
                        <TextInput
                        placeholder="Password"
                        style={styles.textInput}
                        />
                    </View>
                    <View style={styles.guestDiv}>
                        <Text style={styles.text}>Login As <Text style={styles.guest1}>Guest</Text></Text>
                        <Text style={styles.text}>Forgot <Text style={styles.guest}>Password?</Text></Text>
                    </View>
                    <View style={styles.buttons}>
                    <Text style={styles.btnLogin}>LOGIN</Text>
                    <Text style={styles.btnSignup}>SIGN UP</Text>
                    </View>
                </View>
            </View>

                {/* bottom blue */}
              
               
            </View>
            {/* footer */}
            <Footer/>
             
                {/* <SocialIcon/> */}
            {/* </View> */} 
        </View>
      
            <SocialIcon/>
        </View>
    )
    //     <View>
    //       
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
    //             <Button
    //             title="Login"
    //             onPress={login}
    //             />
    //             <Text>Forgot password?</Text>
    //         </View>
    //         <View>
    //             <Text>Login as <Text>Guest?</Text></Text>
    //             <Text>Don't have an account? <Text onPress={register}>Register!</Text></Text>
    //         </View>
    //     </View>
    // )
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
    }
})
