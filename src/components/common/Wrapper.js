import React from 'react';
import { View, Platform } from 'react-native';


const Wrapper = (props) => {

    return (
        <View style={[styles.containerStyle, props.style]} >
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,

    } 
    
}

export { Wrapper };