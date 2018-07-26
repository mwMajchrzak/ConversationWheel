import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Wheel extends Component {
    render() {
        return (
            <View style={styles.container} >

             <Text> Hello </Text>
            </View> 
        )
    }
}

const styles = {
    container: {
        flex: 4
    }
}
export default Wheel;