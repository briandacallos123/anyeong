import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Header from '../../Parts/header'
import User from '../../Images/User.png'

const Profifle = ({route, navigation}) => {
    const item = route.params[0]
    const {age, course, email, id, name, password, section, studentNumber} = item

    return (
        <View style={{
            padding:20
        }}>
            <Header/>
            <View style={styles.container}>
               <View style={styles.main}>
                    <Image
                        source={User}
                        style={styles.img}
                    />
                    <View>
                        <Text style={styles.text}>Name: {name}</Text>
                        <Text style={styles.text}>Age: {age}</Text>
                        <Text style={styles.text}>Section: {section}</Text>
                    </View>
               </View>
               <View style={styles.update}>
                    <TouchableOpacity style={styles.btnUpdate}>
                        <Text style={styles.updateTxt}>Update</Text>
                    </TouchableOpacity>
               </View>
            </View>
        </View>
    )
}

export default Profifle

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    updateTxt:{
        color:'white',
        padding:10,
        fontWeight:'bold',
        textAlign:'center'
        
    },
    btnUpdate:{
        backgroundColor:'#012362',
        width:120,
        borderRadius:15,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0
    },
    
    main:{
        padding:20,
        paddingTop:40,
        flexDirection:'row',
        justifyContent:'center',
    },
    img:{
        height:120,
        width:90,
        marginRight:20
        
    },
    text:{
        color:'#012362',
        fontSize:13
    }
})
