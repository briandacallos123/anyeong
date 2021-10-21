import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Video, TouchableOpacity} from 'react-native';
import Header from '../../Parts/header'
import cmu from '../../Images/cmu.jpg'
import cmuLogo from '../../Images/cmuLogo.png'
import { Entypo } from '@expo/vector-icons';
import cmuStudent from '../../Images/ewan.png'


const width = Math.round(Dimensions.get('window').width)
const About = () => {
    const [img, setImg] = useState([
        {
            img:cmu
        },
        {
            img:cmuLogo
        },
        {
            img:cmuStudent
        }
    ])
    React.useEffect(()=>{
        // setTimeout(()=>{
        //     showImg()
        // },4000)
        // return()=>{
        //     console.log("Clean up");
            
        // }
    })
    const [index, setIndex] = useState(0)
    
    const showImg = () => {
      
            setIndex(prev => {
                if(prev == 2){
                    return prev = 0
                }else{
                    return prev + 1
                }
            })
   
    }
    return (
        <View>
           
            <Image
            source={img[index].img}
            style={{
                height:250,
                width:width,
                
            }}
            />
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
            <View style={styles.container}>
               <View style={{
                   padding:20,
                   alignItems:'center',
                   justifyContent:'center'
               }}>
                    <Text style={styles.mainText}><Text style={styles.logo}>CMU NOW</Text> Is a mobile application for news and upates in City of Malabon University is to give an accurate and realtime news and about the happenings or events inside the campus.</Text>
               </View>
              
               {/* <Image
               source={img[index].img}
               style={{
                   height:200,
                   width:width/1.1
               }}
               /> */}
               <View>
                   <Text style={styles.dev}>Developers</Text>
                   <Text style={styles.dev}>Brian Cesar I. Dacallos</Text>
                   <Text style={styles.dev}>Rica E. Reyes</Text>
                   <Text style={styles.dev}>Mary Rose J. Perez</Text>
                   <Text style={styles.dev}>Hermalyn F. Quinones</Text>
                   <Text style={styles.dev}>Bryan Shane V. Duran </Text>
               </View>
            </View>
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
