import React, {useState} from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity, Alert, ScrollView } from 'react-native'
import Header from '../../Parts/header'
import Poste from './loadDataScreens/post'
import firebase from 'firebase'
import Fost from './searchData/Post'
import { firestore } from '../../../firebase'

const Post = () => {
    const [data, setData] = React.useState([])
    const [searchData, setSearchField] = useState("")
    const [adding, setAdding] = useState(true)
    const [index, setIndex] = useState(0)
    const [info, setInfo] = useState({
        title:"",
        body:""
    })
    const [close, setClose] = useState(false)

    const [post, setPost] = useState({
        title:"",
        body:"",
        comment:[
            {}
        ],
        likes:0
    })
    const [editing ,setEditing] = useState()

    React.useEffect(()=>{
        fetchPostData()
    },[index])

    const fetchPostData = () => {
          firestore.collection('post').get().then((snapshot) => {
            let myArray = []
            snapshot.docs.forEach(doc => {
                myArray.push(doc.data())
            })
            setData(myArray)
            
        })
    }

    const findPost = () => {
        firestore.collection('post').where('title', '==', searchData).get()
        .then((res)=>{
            res.forEach(doc => {
                setInfo({
                    title:doc.data().title,
                    body:doc.data().body,
                })
               
            })
            setSearchField("")
            setClose(true)
        })
    }
    
    console.log("info: ", info.title);

    const addPost = () => {
        if(post.title && post.body){
            firestore.collection('post').add(post)
            Alert.alert("Added Post Successfully")
            setPost({...post, title:"", body:""})
            setIndex(index+1)
        }else{
            Alert.alert("Please input title and body")
        }
    }

    return (
        <View
         style={{
             backgroundColor:'white',
             flex:1,
             padding:10
         }}>
            <Header/>
            {/* <Fost/> */}
            {/* search */}
            <View style={styles.container}>
                    
                    {/* search field */}
                    <View style={styles.search}>
                        <TextInput
                        placeholder="Search Post: "
                        style={styles.textInput}
                        value={searchData}
                        onChangeText={(e)=>{
                            setSearchField(e)
                            
                        }
                        }
                        />
                        <TouchableOpacity onPress={findPost}> 
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width:280,
                        padding:10,
                        flexDirection:'row'
                    }}>
                        {adding ? <View style={styles.ewan} style={{width:170}}>
                           
                        {close && 
                        <View>
                           <View style={styles.ewanko}>
                               <Text style={{fontSize:14, fontWeight:'bold'}}>Title: </Text>
                               {/* dito render */}
                               <Text>{info.title}</Text>
                           </View>
                           
                           <View style={styles.ewanko} >
                               <Text style={{fontSize:14, fontWeight:'bold'}}>Body: </Text>
                               {/* render here */}
                               <Text>{info.body}</Text>
                           </View>
                       </View>}
                      
                        </View>:<View>
                        <View style={styles.ewanko}>
                                <Text>Title: </Text>
                                <TextInput
                                value={post.title}
                                style={{
                                    borderBottomWidth:1,
                                    borderBottomColor:'black',
                                    width:145,
                                    borderRadius:5,
                                    paddingHorizontal:5
                                }}
                                multiline
                                onChangeText={(e)=>setPost({...post, title:e})}
                                />
                            </View>
                            <View style={styles.ewanko} >
                                <Text>Body: </Text>
                                <TextInput
                                value={post.body}
                                style={{
                                    borderWidth:1,
                                    borderRadius:5,
                                    height:100,
                                    width:145,
                                    padding:5
                                }}
                                multiline
                                onChangeText={(e)=>setPost({...post, body:e})}
                                />
                            </View>
                        </View>}
                        <View>
                           {adding ? <View style={{position:'relative',right:-25}}>
                            <TouchableOpacity onPress={()=>setAdding(false)}>
                                <Text style={styles.btn}>Add</Text>
                            </TouchableOpacity>
                            {close && 
                            <View>
                                <TouchableOpacity style={{marginTop:5}}>
                            <Text style={styles.btn}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:5}}>
                            <Text style={styles.btn}>Delete</Text>
                        </TouchableOpacity>
                        </View>
                            }
                               </View>:
                               <View>
                                   <TouchableOpacity onPress={addPost}>
                                       <Text style={styles.btn}>Submit</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={()=>{
                                       setAdding(!adding)
                                   }} style={{marginTop:5}}>
                                       <Text style={styles.btn}>Cancel</Text>
                                   </TouchableOpacity>
                                </View>}
                        </View>
        
                    </View>
                </View>
            <Text style={{
                backgroundColor:'#012362',
                color:'white',
                padding:5,
                width:120,
                fontSize:17,
                fontWeight:'bold',
                textAlign:'center',
                borderRadius:10
            }}>All Post</Text>
           
            {/* <FlatList
            data={data}
            renderItem={(item)=> {
                return <Poste key={item.id} dataz={item}/>
            }}
            /> */}
            <ScrollView>
            {data.map((item, index)=>{
                return <Poste key={index} dataz={item}/>
            })}
            </ScrollView>
           
        </View>
    )
}

export default Post

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
        // padding:3,
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
    ewanko:{
        flexDirection:'row',
        marginBottom:7,
        
    }
})
