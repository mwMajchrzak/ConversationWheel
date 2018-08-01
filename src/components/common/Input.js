import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = ({ labelName, label, value, onChangeText, placeholder, secureTextEntry, labelStyleProps, inputPropsStyle}) => {
    const { inputStyle, containerStyle, labelStyle } = styles;

renderLabel = () => {
    if(label) {
        return <Text style={labelStyle}>{labelName}</Text>
    }
}

    return (
        <View style={containerStyle}>
            {this.renderLabel()}
            <TextInput 
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style= {[inputStyle, inputPropsStyle]}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize = 'none'
            />
       </View>         
    )


};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        minHeight: 35
        
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1 
    },
    containerStyle: {
        hegit: 40,
        flex: 1,
        flexDirection: 'row',
       alignItems: 'center'

    },
}
export { Input };