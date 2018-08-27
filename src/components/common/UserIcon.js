import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

class UserIcon extends Component  {
    render() {
        return   (
            <Icon  
                type="Ionicons" 
                name="md-contact"  
                size={33}
                onPress={this.props.onIconPress}
                color='white'

            />
        );
    }
};

export { UserIcon }