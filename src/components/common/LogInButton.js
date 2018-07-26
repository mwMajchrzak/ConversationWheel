import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const LogInButton = ({ onPressEvent, children }) => {
    return (
        <TouchableOpacity onPress={onPressEvent} style={styles.buttonStyle}>
            <Text style={styles.textStyle}> {children} </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        lineHeight: 30,
        fontWeight: '600',
        padding: 0,
        paddingBottom: 10
    },
    buttonStyle: {
        width: 80,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'grey',
        margin: 1
 
    }
};

export { LogInButton };