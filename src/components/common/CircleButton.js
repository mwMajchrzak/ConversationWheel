import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CircleButton = ({ onPress, icon, color, isDisabled, size }) => {

    const { circleButtonStyle, textStyle } = styles;

    return (
        <TouchableOpacity disabled={isDisabled} onPress={onPress} style={[circleButtonStyle, { backgroundColor: color, width: size, height: size, borderRadius: size/2 }]}>
                <Icon 
                    style={styles.IconPlusStyle} 
                    type="Feather" name={icon}
                    size={25} 
                    color={'#ffffff'}
                />
        </TouchableOpacity>    
    );
};

const styles = {
    iconPlusStyle: {
        alignSelf: 'center',
        color: '6699ff',
    },
    circleButtonStyle: {
        width: 60,
        height: 60,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#6699ff',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#99bbff', 
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        
    }
};
export { CircleButton }; 