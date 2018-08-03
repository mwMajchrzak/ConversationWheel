import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CircleButton = ({ onPress, icon, color }) => {

    const { circleButtonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={[circleButtonStyle, { backgroundColor: color }]}>
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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6699ff',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#99bbff', 
        margin: 15,
        marginTop: 5,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        
    }
};
export { CircleButton }; 