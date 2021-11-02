import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator} from 'react-native'
import logo from '../Images/bg.png'
import { Dimensions } from 'react-native'
import cmu from '../Images/cmu.jpg'

const Welcome = ({navigation}) => {
    const [height, setHeight] = useState(0)
    useEffect(()=>{
        const hayt = Math.round(Dimensions.get('window').height)
        setHeight(hayt)
        callMe()
    },[])

    const callMe = () => {
        setTimeout(()=>{
            navigation.navigate("Login")
        }, 3000)
    }

    return (
        <View style={{
            backgroundColor:'#012362',
            height:height,
            justifyContent:'center'
        }}>
          
           <View style={styles.subContainer}>
                <Image
                source={cmu}
                style={{
                    height:height / 2.5,
                    width:Math.round(Dimensions.get('window').width)

                }}
                />
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    
    
    
    
    img:{
        height:180,
        width:170,
        position:'relative',
        left:20,
       
        
    },
    
    logo:{
        color:'#012362',
        fontSize:40,
        fontWeight:'bold',
       
        textShadowColor:'#DDD7D7',
        textShadowOffset:{
            width:2,
            height:2
        },
        textShadowRadius:0.1
       
    },
})
