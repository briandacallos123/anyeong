import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const Footer = () => {
    const [screen, setScreen] = useState({
        screenWidth:"",
        screenHeight:""
    })
    React.useEffect(()=>{
        const hayt = Math.round(Dimensions.get('window').width)
        const haytz = Math.round(Dimensions.get('window').height)
        setScreen({
            screenWidth:hayt,
            screenHeight:haytz
        })
        
    },[])
    return (
      <View style={{
          alignItems:'center'
      }}>
          <View style={styles.line}></View>
      </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    line:{
        height:1,
        width:260,
        backgroundColor:'#012362',
        
    }
    
})
