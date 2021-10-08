import React from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native'
import Header from '../../Mainphase/Header'
import User from './loadDataScreens/user'
import firebase from 'firebase'
import Userz from './searchData/User'

const Users = () => {
    const [data, setData] = React.useState([])

    React.useEffect(()=>{
        fetchPostData()
    },[])

    const fetchPostData = ()=>{
        firebase.firestore().collection('users').get()
        .then(res => {
            const dataArray = []
           
            res.forEach(doc => {
                const newObj = {...doc.data()}
                dataArray.push(newObj)
            })
            
            setData(prev => {
                return [...prev, ...dataArray]
            })
          
            
        })
     
    }
    

    return (
        <View>
            <View style={styles.header}>
                <Header/>
                {/* Search Data */}
                <Userz/> 
                <Text>All Data</Text>
                <View>
                    <View>
                        {data.map((item) => {
                            
                            return <User key={item.id} data={item}/>
                        })}
                    </View>
                 </View>
            </View>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({

    
})
