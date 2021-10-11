import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert} from 'react-native'
import Header from '../Parts/header'
import RadioGroup from 'react-native-radio-buttons-group';
import { Dimensions } from 'react-native';
import {auth} from '../../firebase'
import { firestore } from '../../firebase';

const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Yes',
    value: 'yes'
}, {
    id: '2',
    label: 'No',
    value: 'no'
}]

const Forme = ({props}) => {
    const navigation = props
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [data, setData] = useState({
        name:"",
        age:"",
        email:"",
        password:"",
        rePassword:"",
        isStudent:false,
        studentNumber:"",
        course:"",
        yrSec:""

    });
    React.useEffect(()=>{
        const wid = Math.round(Dimensions.get('window').width)
    },[])

    function onPressRadioButton(radioButtonsArray) {
       
        radioButtonsArray.map((item) => {
          
            if(item.label == "Yes" && item.selected == true){
                console.log(item);
                setData({...data, isStudent:true})
            }
            if(item.label == "No" && item.selected == true){
                console.log(item);
                setData({...data, isStudent:false})
            }
        })
     
    }
    const submit = () => {
        if(data.password == data.rePassword){
            auth.createUserWithEmailAndPassword(data.email, data.password)
            .then((res)=>{
                const uid = res.user.uid;
                const myEmail = res.user.email;
                const dataNatin = {
                    id:uid,
                    email:myEmail,
                    password:data.password,
                    name:data.name.charAt(0).toUpperCase()+data.name.slice(1),
                    age:data.age,
                    studentNumber:data.studentNumber,
                    course:data.course.charAt(0).toUpperCase()+data.course.slice(1),
                    section:data.yrSec.charAt(0).toUpperCase()+data.yrSec.slice(1)
                }
                const usersRef = firestore.collection('users')
                usersRef.doc(uid).set(dataNatin)
                .then(()=>{
                    Alert.alert("Congrats, you've registered successfully")
                    navigation.navigate("Login")
                })
                .catch((e)=>{
                    Alert.alert("Sorry credentials failed: ", e.message)
                })
                
            })
            .catch((e)=>{
                Alert.alert("Error:", e.message);
            })
                
             }
            
        }
    
    

    return (
        <View style={{
           
           padding:30
        }}>
                {/* header */}
                <Header/>
                {/* main form */}
                <View>
                    <Text style={styles.register}>Register</Text>
                </View>
                {/* inputs */}
                <View>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Name ex.last name, first name. M.I"
                    onChangeText={(e) => setData({...data, name:e})}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Age"
                    onChangeText={(e) => setData({...data, age:e})}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(e) => setData({...data, email:e})}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(e) => setData({...data, password:e})}
                    />
                    <TextInput
                    style={styles.textInput}
                    placeholder="Re-enter Password"
                    onChangeText={(e) => setData({...data, rePassword:e})}
                    />
                    <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
                        <Text>CMU student?</Text>
                        <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={onPressRadioButton}
                        layout='row'/>
                        
                    </View>
                    {data.isStudent ? <View>
                        <TextInput
                        style={styles.textInput}
                        placeholder="Student#"
                        onChangeText={(e) => setData({...data, studentNumber:e})}
                        />
                        <TextInput
                        style={styles.textInput}
                        onChangeText={(e) => setData({...data, course:e})}
                        placeholder="Course"
                        />
                        <TextInput
                        style={styles.textInput}
                        onChangeText={(e) => setData({...data, yrSec:e})}
                        
                        placeholder="Yr & Sec"
                        />
                    </View>:<Text></Text>}
                    {/* btrns */}
                    <TouchableOpacity style={styles.btn} onPress={submit}>
                        <Text style={{
                            color:'white',
                            padding:10,
                            textAlign:'center',
                            fontWeight:'bold'
                        }}>SUBMIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Login')}>
                        <Text style={{
                            color:'white',
                            padding:10,
                            textAlign:'center',
                            fontWeight:'bold'
                        }}>LOGIN</Text>
                    </TouchableOpacity>
                    
     
                </View>
        </View>
    )
}

export default Forme

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#02215A',
        color:'white',
        marginTop:5,
    },
    
    register:{
        color:"#02215A",
        fontSize:18,
        // fontWeight:'bold'
    },
    textInput:{
        borderBottomColor:'black',
        borderBottomWidth:1,
        fontWeight:'normal',
        fontSize:13,
        
        padding:10,
        width:300,
        paddingLeft:2
        
    },
    picker:{
        borderColor:1,
        borderWidth:1
    },
    
})
