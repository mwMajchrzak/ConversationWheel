 
 import React from 'react';
import { View, Platform, Text } from 'react-native';


const TopBar = (props) => {

    return (
        <View style={styles.containerStyle}>
            <View style={[styles.iconSection, props.style]}>
                {props.children}
            </View>
            <View style={styles.titleSection}>
                <Text>{props.title}</Text>
            </View>
        </View>

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
    containerStyle: {
        flex: 1
    },
    titleSection: {
        position: 'absolute',
        justifyContent: 'center',
        flexDirection: 'column',
        height: 80,
        alignItems: 'center',
   
       // padding: 15,
        //backgroundColor: '#66b3ff'

    },  
    
}

export { TopBar };