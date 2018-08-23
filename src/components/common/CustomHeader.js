
import React from "react";
import { Header } from "react-navigation";
import { View, Platform, Text } from "react-native";
//import LinearGradient from "react-native-linear-gradient";



const CustomHeader = props => {
  return (

  
        <View style={styles.iconSection}>
            <Header {...props} />
        </View>
        
   

    // <View
    //   style={{
    //     height: 56,
    //   }}
    // >
     
    //     <Header {...props} />
     
    // </View>
  );
};
const styles = {
    iconSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        padding: 15,
       backgroundColor: '#66b3ff'

    },
    // containerStyle: {
    //     flex: 1
    // },
    // titleSection: {
    //     position: 'absolute',
    //     justifyContent: 'center',
    //     flexDirection: 'column',
    //     height: 80,
    //     alignItems: 'center',
   
       // padding: 15,
        //backgroundColor: '#66b3ff'

    }
    

export default CustomHeader;