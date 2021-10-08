import React, {useState} from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import logo from '../Images/bg.png'
import { Entypo } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';

const Header = () => {
    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
    const [shadowRadius, setShadowRadius] = useState(0);
    const [shadowOpacity, setShadowOpacity] = useState(0.1);
    const [height, setHeight] = useState("")

    React.useEffect(()=>{
        const hayt = Math.round(Dimensions.get('window').height)
        
    }, [])
    return (
        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            position:'relative',
            top:12,
          
           
        }}>
            <View style={styles.subContainer}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.logo}>
                        CMU NOW
                    </Text>
                    <View style={styles.line}></View>
                </View>
                <Image
                source={logo}
                style={styles.img}
                />
                
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    
    subContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:20,
        
    },
    img:{
        height:140,
        width:85,
        position:'relative',
        top:5
    },
    
    logo:{
        color:'#012362',
        fontSize:32,
        fontWeight:'bold',
        marginRight:5,
        textShadowColor:'#DDD7D7',
        textShadowOffset:{
            width:2,
            height:2
        },
        textShadowRadius:0.1
       
    },
    line:{
        height:2,
        width:130,
        backgroundColor:'#012362'
    }

})
