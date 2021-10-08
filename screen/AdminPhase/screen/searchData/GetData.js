import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase';

export const getPost = (value) => {
        const [data, setData] = useState("")
        firebase.firestore().collection("post").where("title", '==', title).get()
        .then(res => {
            res.forEach(doc => {
                setData(doc.data())
                if(doc.data()){
                    setData(doc.data())
                }
                
            })
            
        })
        .catch((e) => console.log((e.message)))
        return {data}
}


const styles = StyleSheet.create({})
