 
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors'

class ButtonLogInForm extends Component {

    asignButtonStyle = (isCurrent) => {
        const { currentButtonStyle, buttonStyle } = styles
       return isCurrent ? [buttonStyle, currentButtonStyle] : buttonStyle
    }    
    asignTextStyle = (isCurrent) => {
        const { currentTextStyle, textStyle } = styles
        return isCurrent ? [textStyle, currentTextStyle] : textStyle
    }  

render() {

   const  { onPress, children, isCurrent, isDisabled } = this.props
    return (
        <TouchableOpacity disabled={isDisabled} onPress={onPress} style={this.asignButtonStyle(isCurrent)}>
            <Text style={this.asignTextStyle(isCurrent)}>
                {children}
            </Text>
        </TouchableOpacity>    
    );
    };
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        color: colors.grey
    },

    currentTextStyle: {
        color: '#fafafa',
    },

    buttonStyle: {

        width: '55%', 
        height: 54, 
        flex: 0, 
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 24,
        justifyContent: 'center',

    },

    currentButtonStyle: {

        borderRadius: 27,
        backgroundColor: colors.darkBlue,
        shadowOffset:{  width: 0,  height: 0 },
        shadowRadius: 10,
        shadowColor: '#1a1a1a',
        shadowOpacity: 0.3,
    }
};
export { ButtonLogInForm }; 

