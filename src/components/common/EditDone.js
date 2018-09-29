import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class EditDone extends Component  {
    render() {
        console.log( 'editdone', this.props)
        if (this.props.deleteMode) {
        return   (
            <Text> Done</Text>
        )}
        return (
           
            <Icon  
                type="Ionicons" 
                name="trash-2"  
                size={30}
                onPress={this.props.onButtonPress}
                color='white'

            />
        )
    }
};

export { EditDone }