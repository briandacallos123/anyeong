import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Video, TouchableOpacity} from 'react-native';
import Header from '../../Parts/header'
import cmu from '../../Images/cmu.jpg'
import cmuLogo from '../../Images/cmuLogo.png'
import { Entypo } from '@expo/vector-icons';
import cmuStudent from '../../Images/ewan.png'
import bago from '../../Images/bago.png'
import lipunan from '../../Images/lipunan.png'


const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)
const About = () => {
    const [img, setImg] = useState([
        
        {
            img:cmuLogo
        },
        {
            img:cmuStudent
        },
        {
            img:bago
        },
        {
            img:lipunan
        },
    ])
   
    const [index, setIndex] = useState(0)
    
    const showImg = () => {
      
            setIndex(prev => {
                if(prev == 3){
                    return prev = 0
                }else{
                    return prev + 1
                }
            })
   
    }
    return (
        <View style={{
            height:height,
            flex:1
        }}>
           
            <Image
            source={cmu}
            style={{
                height:250,
                width:width,
                
            }}
            />
           
            <ScrollView>
            <View style={styles.container}>
               <View style={{
                   padding:20,
                   alignItems:'center',
                   justifyContent:'center'
               }}>
                    <Text style={styles.mainText}><Text style={styles.logo}>CMU NOW</Text> Is a mobile application for news and upates in City of Malabon University is to give an accurate and realtime news and about the happenings or events inside the campus.</Text>
               </View>
               
              
               <View style={{
                   justifyContent:'center',
                   alignItems:'center'
               }}>
                <Image
                source={img[index].img}
                style={{
                    height:200,
                    width:width/1
                }}
                />
               </View> 
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    zIndex:2,
                    width:100,
                    alignSelf:'center',
                    top:5
                        }}>  
                            <Entypo name="chevron-left" size={24} color="#012362" onPress={showImg}/>
                            <Entypo name="chevron-right" size={24} color="#012362" onPress={showImg}/>
                </View>
               <View>
                   <Text style={styles.dev}>Developers</Text>
                   <Text style={styles.dev}>Brian Cesar I. Dacallos</Text>
                   <Text style={styles.dev}>Rica E. Reyes</Text>
                   <Text style={styles.dev}>Mary Rose J. Perez</Text>
                   <Text style={styles.dev}>Hermalyn F. Quinones</Text>
                   <Text style={styles.dev}>Bryan Shane V. Duran </Text>
               </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    mainText:{
        fontSize:15,
        lineHeight:25
    },
    logo:{
        color:'#012362',
        fontWeight:'bold',
        fontSize:18
    },
    dev:{
        color:'#9E9D9D',
       
    }
    
    
    
})
