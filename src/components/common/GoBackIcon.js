import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

class GoBackIcon extends Component  {
    render() {
        return   (
            <Icon  
                type="Ionicons" 
                name="ios-arrow-back-outline"  
                size={30}
                onPress={this.props.onIconPress}
                color='white'

            />
        );
    }
};

export { GoBackIcon }