import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Messeage = ({  children, visible, onAccept, onDecline }) => {
const { 
    containerStyle, 
    textStyle, 
    iconSectionStyle, 
    buttonsSectionStyle, 
    buttonBackStyle, 
    buttonLoginStyle, 
    buttonTextStyle,
    messeageStyle,
    messeageTitleStyle,
    borderStyle
} = styles;

return (
    <Modal
        visible={visible}
        transparent

        animatonType="slide"
        onRequestClose={() => {}}
        >
        <View style={containerStyle}>
            
                <CardSection style={iconSectionStyle}>
                    <Icon 
                        style={styles.IconStyle} 
                        type="Octicons" name="key"
                        size={65} 
                        color={'#ffffff'}
                    />
                </CardSection>
                <CardSection style={buttonsSectionStyle}>
                    <Text style={messeageTitleStyle}>Hold up!</Text>
                    <Text style={messeageStyle}>Sign in or register in order to play with your own categories and topics.</Text>
                    <Button onPress={onAccept} style={buttonLoginStyle} buttonTextStyle={buttonTextStyle}>Log In </Button>   
                    <Button onPress={onDecline} style={buttonBackStyle}>Go Back </Button> 
                    
                </CardSection>
              
        </View>         
    </Modal>
)
};

const styles = {
    iconSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        border: 0,
        height: '20%',
        width: '80%',
        backgroundColor: '#66b3ff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#1a1a1a',
        shadowOpacity: 0.1,
        

    },
    buttonsSectionStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: 0,
       height: '45%',
       width: '80%',
       borderBottomLeftRadius: 15,
       borderBottomRightRadius: 15,
       shadowOffset:{  width: 10,  height: 10,  },
       shadowColor: '#1a1a1a',
       shadowOpacity: 0.1,

    },
    buttonLoginStyle: {
        width: '50%', 
        height: 40, 
        flex: 0, 
        borderWidth: 0, 
        alignSelf: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#0073e6',
        marginTop: '10%'
       

    },
    buttonTextStyle: {
        color: '#f2f2f2',
    },
    buttonBackStyle: {
        width: '50%',
        height: 40, 
        flex: 0, 
        alignSelf: 'center',
        margin: 10,
        borderWidth: 0, 
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    messeageStyle: {
        fontSize: 12,
        color: '#9999',
        textAlign: 'center',
        margin: 10,
        fontWeight: '600',
        padding: 10,
        lineHeight: 18,
    },
    messeageTitleStyle: {
        fontSize: 30,
        color: '#808080',
        margin: 10,
        fontWeight: '400', 
    },
    iconStyle: {
        alignSelf: 'center',
        color: '6699ff',
    },

}

export  { Messeage };