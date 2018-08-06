import React from 'react';

import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Messeage = ({  children, visible, onAccept, onDecline }) => {
const { containerStyle, textStyle, cardSectionStyle } = styles;

return (
    <Modal
        visible={visible}
        transparent
        animatonType="slide"
        onRequestClose={() => {}}
        >
        <View style={containerStyle}>
            <CardSection style={cardSectionStyle}>
                <Text style={textStyle}>
                {children}
                </Text>
            </CardSection>
            <CardSection>
                 <Button onPress={onDecline}>Go Back </Button> 
                <Button onPress={onAccept}>Log In </Button>   
                
            </CardSection>
        </View>         
    </Modal>
)
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
}

export  { Messeage };