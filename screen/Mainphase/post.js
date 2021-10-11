import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { firestore } from '../../firebase';
import { arrayUnion } from '../../firebase';

const Post = ({data}) => {
    const [isComment, setComment] = useState(false)
    const {title, body, id, comment} = data
    const [commentz, setCommentz] = useState("");


    const addComment = () => {
        let docRef = firestore.collection('post').doc(id);
        
        // docRef.update({
        //     comment:firestore.fi.arrayUnion(commentz)
        // })
        
        // comment = firestore.arrayUnion(commentz)
        // if(commentz){
          
        //     firestore.collection('post').doc(id).set({
        //         title,
        //         body,
                
        //     })
        //     // firestore.collection('post').doc(id).update({
        //     //    comment:firestore.arrayUnion(commentz)
        //     // })
            
        //     // firebase.firestore().collection('post').doc(id).update({
        //     //     comment:[{...comment}]
        //     // })
        //     // const arrayUnion = firebase.firestore().collection('post').arrayUnion;
            
            
        //     // const newData = {
        //     //     body,
        //     //     title,
        //     //     comments:[{...coments, comment}]
        //     // }
        //     // firebase.firestore().collection('post').doc(id).set(newData)
        // }
    }
    return (
        <View style={styles.container}>
            <View style={styles.postSection}>
                <Text style={styles.header}>{title.toUpperCase()}</Text>
                <Text style={styles.body}>{body[0].toUpperCase()+body.slice(1)}</Text>
            </View>
            {/* comments section */}
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{flexDirection:'row', width:90}} onPress={()=>setComment(!isComment)}>
                    <EvilIcons name="comment" size={24} color="green" />
                    <Text>Comment</Text>
                </TouchableOpacity>
                {isComment && 
                <View style={{backgroundColor:'#F4F6F9', flexDirection:'row',alignItems:'center'}}>
                   <TextInput
                   placeholder="Write a comment..."
                   style={{width:250, padding:10,color:'black'}}
                   onChangeText={(e)=>setCommentz(e)}
                   />
                   {/* triggering comment */}
                  <TouchableOpacity onPress={addComment}>
                    <Feather name="send" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                }
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
