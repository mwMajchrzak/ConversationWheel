 import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';

class TrashIcon extends Component  {
    render() {
        return   (
            <Icon  
                type="Feather" 
                name="trash-2"  
                size={30}
                onPress={this.props.onIconPress}
                color='white'

            />
        );
    }
};

export { TrashIcon }