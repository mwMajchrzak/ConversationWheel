import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style, buttonTextStyle, isDisabled }) => {

    const { buttonStyle, textStyle  } = styles;

    return (
        <TouchableOpacity disabled={isDisabled} onPress={onPress} style={[buttonStyle, style]}>
            <Text style={[textStyle, buttonTextStyle]}>
                {children}
            </Text>
        </TouchableOpacity>    
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        color: '#a6a6a6'
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
    }
};
export { Button }; 