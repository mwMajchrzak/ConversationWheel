import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';



const CircleButton = ({ onPress }) => {


    const { CircleButtonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={CircleButtonStyle}>
                <Icon 
                style={styles.IconPlusStyle} 
                type="Feather" name="plus"  
                size={30} 
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
    CircleButtonStyle: {
        width: 50,
        height: 50,
        //alignSelf: 'center',
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