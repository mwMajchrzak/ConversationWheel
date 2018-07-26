import React from 'react';
import { Text, View } from 'react-native';


const HeaderSection = ({ text }) =>  {

    return (
        <View style={styles.viewSeciton} > 
            <Text style={styles.questionSeciton}>Bored with small talks?</Text>
            <Text style={styles.textSeciton}>{text} </Text>
        </View>

    );
};
const styles = {
    viewSeciton: {
        padding: 15,
        paddingTop: 40,
        flex: 1,
        //backgroundColor: 'red'
    },

    questionSeciton: {
        fontSize: 15,
        padding: 5
    },

    textSeciton: {
        fontSize: 25,
        padding: 5
    }
}
export default HeaderSection;