import React, {useState, useEffect, useRef} from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { firestore } from '../../firebase';
import { arrayUnion } from '../../firebase';
import { retName } from './screens/Profile';
import { AntDesign } from '@expo/vector-icons';
import {RetGuest} from './ItoDapat'

const Post = ({data}) => {
    const [isGuest, setGuest] = useState(RetGuest)
    console.log(isGuest);
    const [isComment, setComment] = useState(false)
    const {title, body, id, comment, likes} = data
    const [commentz, setCommentz] = useState({
        name:"",
        comment:""
    }); 
    const [isLike, setLike] = useState(false);
    
    const [myData, setMyData] = useState(comment)
    const [leastData, setLeastData] = useState([])
    const [showMore, setShowMore] = useState(false)
    
    // hold likes state
    const [liked, setLikes] = useState(likes)

    useEffect(()=>{
        firestore.collection('post').doc(id).update({
            comment:myData,
            likes:liked
        })
        revData()
       
    },[myData, liked])

 
   

    const addComment = () => {
       if(isGuest){
           Alert.alert("You have to create an account first before commenting.")
       }else{
        setMyData([...myData, commentz])
        setCommentz("")
        
       }
    }

    const revData = () => {
        let myRevData = myData.map((item) => item).reverse()
        setLeastData(myRevData)
    }

    // addlike
    

    const RenderData = () => {
        return(
            <View>
                {leastData.map((item, index) => {
                    if(index < 3){
                        return(
                            <View key={index} style={{marginBottom:5}}>
                                <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                                <Text>{item.comment}</Text>
                            </View>
                        )
                        }
                    if(showMore){
                        return(
                            <View key={index} style={{marginBottom:5}}>
                                <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                                <Text>{item.comment}</Text>
                            </View>
                        )
                    }
                })}
            </View>
        )
    }
    const tawaginMoko = () => {
        if(!isGuest){
            setLikes(likes + 1)
        }else{
            Alert.alert("Register ka muna")
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.postSection}>
                <Text style={styles.header}>{title.toUpperCase()}</Text>
                <Text style={styles.body}>{body[0].toUpperCase()+body.slice(1)}</Text>
            </View>
            {/* comments section */}
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <View style={{
                    borderBottomColor:'#F4F6F9',
                    borderBottomWidth:1,
                    alignSelf:'stretch',
                    alignItems:'center',
                    marginBottom:10,
                }}>
                    <View style={{
                        alignSelf:'stretch',
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>tawaginMoko()}>
                                <AntDesign name="like1" size={22} color="green" />
                            </TouchableOpacity>
                            <Text style={{position:'relative',top:2, marginLeft:5}}>{liked}</Text>
                        </View>

                        <TouchableOpacity style={{flexDirection:'row', width:90, marginBottom:5, flex:2}} onPress={()=>setComment(!isComment)}>
                        <FontAwesome name="commenting" size={22} color="green" />
                            <Text style={{marginLeft:5}}>Comment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* adding comment */}
                <View style={{backgroundColor:'#F4F6F9', flexDirection:'row',alignItems:'center',alignSelf:'stretch', marginBottom:7}}>
                    <TextInput
                    placeholder="Write a comment..."
                    value={commentz.comment}
                    style={{width:250, padding:10,color:'black'}}
                    onChangeText={(e)=>setCommentz({...commentz,name:retName(), comment:e})}
                    />
                    {/* triggering comment */}
                    <TouchableOpacity onPress={addComment}>
                        <Feather name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* List of All comment */}
                <View style={{
                    alignSelf:'stretch',
                   
                }}>
                    {<RenderData/>}
                 {myData.length > 4 &&  <TouchableOpacity style={{marginTop:10}} onPress={()=>setShowMore(!showMore)}>
                        <Text style={{fontWeight:'bold'}}>{showMore ? <Text>Show Less...</Text>:<Text>Show More...</Text>}</Text>
                   </TouchableOpacity>}
                  
                </View>

                
                
                
            </View>
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container:{
        padding:20,
        marginBottom:10,
        backgroundColor:'white',
        borderRadius:20,
        borderTopLeftRadius:0,
    },
    header:{
        fontSize:25,
        marginBottom:20
    },
    postSection:{
        borderBottomColor:'#E6E8EB',
        borderBottomWidth:1,
        padding:10,
        marginBottom:5
    }

})
