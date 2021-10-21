import React, {useState, useEffect, useRef} from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { firestore } from '../../firebase';
import { arrayUnion } from '../../firebase';
import { retName } from './screens/Profile';
import { AntDesign } from '@expo/vector-icons';

const Post = ({data}) => {
    const [isComment, setComment] = useState(false)
    const {title, body, id, comment} = data
    const [commentz, setCommentz] = useState({
        name:retName(),
        comment:""
    }); 
    const [myData, setMyData] = useState(comment)
    const [leastData, setLeastData] = useState([])

    useEffect(()=>{
        firestore.collection('post').doc(id).update({
            comment:myData
        })
        Ret5()
    },[myData])
   

    const addComment = () => {
        setMyData([...myData, commentz])
        setCommentz("")
       
        
    }

    const Ret5 = () =>{
       let revItem = myData.map(item => item).reverse()
       setLeastData(revItem)
    }

    const RenderData = () => {
       leastData.map((item, index) =>{
           if(index < 3){
               return (
                   <View>
                       <Text>{item.name}</Text>
                       <Text>{item.comment}</Text>
                   </View>
               )
           }
       })
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
                        <TouchableOpacity style={{flex:1}}>
                        <AntDesign name="like1" size={22} color="green" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row', width:90, marginBottom:5, flex:2}} onPress={()=>setComment(!isComment)}>
                        <FontAwesome name="commenting" size={22} color="green" />
                            <Text style={{marginLeft:5}}>Comment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* adding comment */}
                <View style={{backgroundColor:'#F4F6F9', flexDirection:'row',alignItems:'center',alignSelf:'stretch'}}>
                    <TextInput
                    placeholder="Write a comment..."
                    value={commentz.comment}
                    style={{width:250, padding:10,color:'black'}}
                    onChangeText={(e)=>setCommentz({...commentz, comment:e})}
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
                   <TouchableOpacity style={{marginTop:10}}>
                        <Text style={{fontWeight:'bold'}}>View More Comments...</Text>
                   </TouchableOpacity>
                  
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
