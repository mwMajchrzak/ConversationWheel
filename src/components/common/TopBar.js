 
 import React from 'react';
import { View, Platform } from 'react-native';


const TopBar = (props) => {

    return (
        <View style={[styles.containerStyle, props.style]} >
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop:( Platform.OS === 'ios' ) ? 20 : 0,
        height: 80,
        alignItems: 'center',
        padding: 15

    } 
    
}

export { TopBar };