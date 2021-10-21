import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableOpacityBase} from 'react-native'

import User from './loadDataScreens/user'
import { firestore } from '../../../firebase'
import Userz from './searchData/User'
import Header from '../../Parts/header'

const Users = () => {
    const [data, setData] = React.useState([])
    const [showData, setShowData] = React.useState(false)

    React.useEffect(()=>{
        fetchPostData()
    },[])

    const fetchPostData = ()=>{
        // firestore.collection('users').get()
        // .then(res => {
        //     const dataArray = []
           
        //     res.forEach(doc => {
        //         const newObj = {...doc.data()}
        //         dataArray.push(newObj)
        //     })
            
        //     setData(prev => {
        //         return [...prev, ...dataArray]
        //     })
          
            
        // })
        firestore.collection('users').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();

          

            changes.forEach(change => {
                if(change.type == "added"){
                  let newData = change.doc.data()
                  setData([...data, newData])

                }else{
                    console.log("Deleted, data: ", change.doc.data());
                }
            })
            
         
            // console.log("Array mo: ", dataArray);
            // if(data.length == 0){
            //     setData([...data, dataArray])
            // }else{
            //     data.map((item) => {
            //         if(item.id != dataArray.id){
            //             setData([...data, dataArray])
            //             // console.log("Not equal");
            //         }else{
            //             // console.log("Equal");
            //             setData([...data, dataArray])
            //         }
            //     })
            // }
           
        //    if(data.length > 0){
        //     data.map((item) => {
        //         if(item.id != dataArray[0].id){
        //             console.log("not equal");
        //         }else{
        //             console.log("Equal");
        //         }
        //     })
        //    }else{
        //        console.log("Wala pa laman");
        //    }
            // console.log("ARRAY: ", dataArray);

            // if(dataArray.length > 0){
            //     console.log("Orayt");
            //     setData((prev)=>{
            //        let newItem = dataArray.map((item)=>{
            //             if((!item.id == prev.id)){
            //                 return item
            //             }
            //         })
            //         return [...prev, newItem]
            //     })
            // }
            // setData(dataArray)
            // if(dataArray.length > 0){
            //     console.log("True");
            //     setData((prev)=> {
            //         let newData = dataArray.map((item) => {
            //             if(!item.id == prev.id){
            //                 return item
            //             }
            //         })
            //         return [...prev, newData]
            //     })
            // }
            // setData(prev => {
            //     return [...prev, ...dataArray]
            // })
        })
     
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                {/* Search Data */}
                <Userz/> 
                
                <View>
                    <TouchableOpacity style={{
                        backgroundColor:'#012362',
                        width:120,
                        padding:10,
                        marginTop:10,
                        borderRadius:10
                    }}>
                        <Text style={{
                            fontSize:15,
                            fontWeight:'bold',
                            color:'white'
                        }}>Show All User</Text>
                    </TouchableOpacity>
                <View>
                <FlatList
                        keyExtractor={(item)=>item.id}
                        data={data}
                        renderItem={(item)=>{
                            return <User key={item.id} data={item}/>
                        }}
                    />
                </View>
                    {/* <View>
                       
                        <View>
                            <View>
                                <Text>Name:</Text>
                                <TouchableOpacity>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View> */}
                 </View>
            </View>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:'white',
        flex:1
    },

    
})
