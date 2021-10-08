import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';

const User = () => {
    const [dataMo, setData] = useState("")
    const [noData, setNoData] = useState(false)
    const [searchField, setSearchField] = useState("")
    const [edit, setEdit] = useState(true)
    const [editVar, setEditVar] = useState("")

    const findUser = (e) => {
        firebase.firestore().collection("users").where("email", '==', searchField).get()
        .then(res => {
            res.forEach(doc => {
                setData(doc.data())
                if(doc.data()){
                    setSearchField("")
                }
                
            })
            
        })
        .catch((e) => console.log((e.message)))
        
    }
    
    const editMe = () => {
        setEdit(!edit)
    }   
    
    
    
    const ReturnComponent = () => {
        return(
            <View>
                <View>
                    {edit ? <Text>Name:{dataMo.name}</Text>:
                    <View style={styles.edit}>
                        <Text>Name:</Text><TextInput name="name" value={dataMo.name} style={styles.textInput}/>
                    </View>}
                </View>
                <View>
                    {edit ? <Text>Age:{dataMo.age}</Text>:
                    <View style={styles.edit}>
                        <Text>Age:</Text><TextInput name="age"  value={dataMo.age}  style={styles.textInput}/>
                    </View>}
                  
                </View>
                <View>
                    {edit ? <Text>Email:{dataMo.email}</Text>:
                    <View style={styles.edit}>
                        <Text>Email:</Text><TextInput value={dataMo.email} style={styles.textInput}/>
                    </View>}
                  
                </View>
                <View>
                    {edit ? <Text>Id:{dataMo.id}</Text>:
                    <View style={styles.edit}>
                        <Text>Id:</Text><TextInput value={dataMo.id} style={styles.textInput}/>
                    </View>}
                   
                </View>
                <View>
                    {edit ? <Text>Password:{dataMo.password}</Text>:
                    <View style={styles.edit}>
                        <Text>Password:</Text><TextInput value={dataMo.password} style={styles.textInput}/>
                    </View>}
                </View>
                <Button
                title="edit"
                onPress={editMe}
                />
            </View>
        )
    }
    return (
        <View>
           <View  style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={(e)=>setSearchField(e)}
                placeholder="Find User"
                value={searchField}
                />
               
               <TouchableOpacity style={styles.search} onPress={findUser}>
                    <AntDesign name="search1" size={24} color="black" />
                    <Text style={styles.search}>Search</Text>
               </TouchableOpacity>
           </View>
            
            <View>
                {dataMo ? <ReturnComponent/>:<Text>Walapa</Text>}
            </View>
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:10,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    textInput:{
        borderColor:'black',
        borderWidth:1.2,
        width:150,
        marginRight:10,
        padding:5
    },
    search:{
        backgroundColor:'#cfe4ed',
        padding:3,
        fontSize:15,
        flexDirection:'row',
        alignItems:'center'
    },
    edit:{
        flexDirection:'row'
    }
})
