import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput,Modal, TouchableHighlight, TouchableOpacity, Button, Alert} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { firestore } from '../../../../firebase';
import { Dimensions } from 'react-native';

let index = 0

const User = () => {
    const [dataMo, setData] = useState("")
    const [noData, setNoData] = useState(false)
    const [searchField, setSearchField] = useState("")
    const [edit, setEdit] = useState(true)
    const [editVar, setEditVar] = useState("")
    const [myD, setD] = useState(0)

    React.useEffect(()=>{
        setD(Math.round(Dimensions.get('window').width))
    },[])

    const findUser = (e) => {
       firestore.collection("users").where("email", '==', searchField).get()
        .then(res => {
            res.forEach(doc => {
                setData(doc.data())
                if(doc.data()){
                    setSearchField("")
                    setEdit(!edit)
                }else{
                    Alert.alert("no data found")
                }
                console.log(dataMo);
                
            })
            
        }).catch((e) => Alert.alert("no data found"))
        
        
    }
  
    const deleteUser = () => {
        firestore.collection('users').doc(dataMo.id).delete()
        index + 1
    }
    
    return (
        <View style={styles.container}>
           
            {/* search field */}
            <View style={styles.search}>
                <TextInput
                placeholder="Find user email:"
                style={styles.textInput}
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
                width:280,
                padding:10
            }}>
                <View style={styles.ewan}>
                    <Text>Name: </Text>
                    <TextInput
                    value={dataMo.name}
                    />
                    <TouchableOpacity>
                        <Text style={styles.btn}>Add</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ewan}>
                    <Text>Password: </Text>
                    <TextInput
                    value={dataMo.password}
                    />
                        <TouchableOpacity onPress={deleteUser}>
                            <Text style={edit ? styles.isEdit:styles.btn }>Delete</Text>
                        </TouchableOpacity>
                   
                </View>
                
            </View>
        </View>
    )
}

export default User
export const myIndex = () => {
    return index
}
const styles = StyleSheet.create({
    container:{
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
    }
   
})
