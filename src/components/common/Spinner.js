import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const Spinner = ({ size, style  }) => {
    return (
        <View style={[styles.styleSpinner, style]}> 
            <ActivityIndicator size={ size || 'large' }/>
        </View>
    );
}

const styles = {
    styleSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export { Spinner };