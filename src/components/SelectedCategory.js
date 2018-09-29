import React, { Component } from 'react';
import { Text, View, StyleSheet, onPress, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


class SelectedCategory extends Component {
    renderIcon() {
        if (this.props.isMenuOpen) {
            return (
                <Icon 
                    style={styles.IconArrowStyle} 
                    type="Feather" name="chevron-up"  
                    size={20} 
                    onPress={this.onIconPress}
                />  
            )
        }    

        else if (!this.props.isMenuOpenreturn) {
            return  (
            <Icon 
                style={styles.IconArrowStyle} 
                type="Feather" name="chevron-down"  
                size={20} 
                onPress={this.onIconPress}
             />   
        )
    }
    }
    render() {
        return (
        <TouchableOpacity  style={styles.container} onPress={this.props.onPress}>
            <Text style={styles.textStyle} >{this.props.selectedValue} </Text>  
            {this.renderIcon()}
                
         </TouchableOpacity>
        )
    }
};
const styles = {
    container: {
        borderColor: 'grey',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
    },
    IconArrowStyle: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        right: 10,
        opacity: 0.7
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 17
    }
}
export default SelectedCategory;