import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';

class MenuIcon extends Component  {
    render() {
        return   (
            <Icon 
                style={styles.IconMenuStyle} 
                type="Feather" name="menu"  
                size={25} 
                onPress={this.props.onIconPress}
                color='white'
            />
        );
    }
};
const styles = {
    IconMenuStyle: {
        margin: 1
    }
}
export { MenuIcon }