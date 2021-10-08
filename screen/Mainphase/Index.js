import React, {useEffect, useState} from 'react'
import { Alert, Button, StyleSheet, Text, View, FlatList } from 'react-native'
import firebase from 'firebase'
import Post from './post';
import Header from './Header';

function Main(){
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
             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    {/* header */}
                    <Header/>
                    <View>
                      {data.map((item) => {
                         
                          return <Post key={item.id} data={item}/>
                      })}
                      
                    </View>
             </View>
        </View>
    )
    
}
export default Main

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    }
})







