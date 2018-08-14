import React from 'react';
import { Text, View } from 'react-native';


const HeaderSection = ({ text, style }) =>  {

    return (
        <View style={[styles.viewSeciton, style]} > 
            <Text style={styles.questionSection}>Bored with small talks?</Text>
            <Text style={styles.textSection}>{text} </Text>
        </View>

    );
};
const styles = {
    viewSeciton: {
        padding: 15,
        paddingTop: 20,
        flex: 1,
        margin: 20,
        //backgroundColor: 'red'
    },

    questionSection: {
        fontSize: 15,
        padding: 5
    },

    textSection: {
        fontSize: 27,
        padding: 5,
        fontFamily: 'Arial', 
        fontWeight: '400', 
        fontStyle: 'normal'
    }
}
export default HeaderSection;