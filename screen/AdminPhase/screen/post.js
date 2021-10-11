import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Header from '../../Mainphase/Header'
import Poste from './loadDataScreens/post'
import firebase from 'firebase'

const Post = () => {
    const [data, setData] = React.useState([])

    React.useEffect(()=>{
        fetchPostData()
    },[])
  
    const fetchPostData = ()=>{
        firebase.firestore().collection('post').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            const dataArray = []

            changes.forEach(change => {
                if(change.type == "added"){
                        const id = change.doc.id
                        // const newObj = {...doc.data(), id}
                        const newObj = {...change.doc.data(), id}
                        dataArray.push(newObj)
                }
                console.log("data mo: ",data)
                setData(prev => {
                        return [...prev, ...dataArray]
                 })
               
            })
          
        })
      
    }

    return (
        <View>
            <Header/>
            <Text>Post</Text>
            <FlatList
            data={data}
            renderItem={(item)=> {
                return <Poste key={item.id} dataz={item}/>
            }}
            />
        </View>
    )
}

export default Post

const styles = StyleSheet.create({})
