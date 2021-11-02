import React, {useEffect, useState} from 'react'
import { Alert, Button, StyleSheet, Text, View, FlatList } from 'react-native'
import firebase from 'firebase'
import Post from '../post';
import Header from '../../Parts/header'


function NewsUpdates(){
    
  
 
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchPostData()
    },[])
    
    const fetchPostData = ()=>{ 
        firebase.firestore().collection('post').get()
        .then(res => {
            const dataArray = []
           
            res.forEach(doc => {
                const id = doc.id
                const newObj = {...doc.data(), id }
                dataArray.push(newObj)
            })
            setData(prev => {
                return [...prev, ...dataArray]
            })
        })
     
    }


     
   
    return(
        <View style={styles.container}>
             <View style={styles.innerContainer}>
                    {/* header */}
                    <Header/>
                    <View style={styles.itemContainer}>
                    
                       <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => {
                                return <Post  data={item} />
                            }}
                      /> 
                      
                    </View>
             </View>
        </View>
    )
    
}
export default NewsUpdates

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    innerContainer:{
        flex:1
    },
    itemContainer:{
        flex:1
    }
   
})







