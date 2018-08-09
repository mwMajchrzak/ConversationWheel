import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { signupUser, repeatPasswordChanged, emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';
import { Text, View, TouchableOpacity } from 'react-native';
import { GoBackIcon, TopBar, Wrapper } from './common'; 
import Icon from 'react-native-vector-icons/Ionicons';

class LoginForm extends Component {
    state = {
        SignUpPage: false
    }
    togglePages = ()  => this.setState({ SignUpPage: !(this.state.SignUpPage) });
    
    onBackIconPress = () =>   { 
        const { goBack, state } = this.props.navigation
        goBack(null)
        if( state.params != null ) { state.params.updateData({ showModal: true }) }
    }

    onEmailChange(text) {
        this.props.emailChanged(text);

    }
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }
    onRepeatPasswordChange(text) {
       this.props.repeatPasswordChanged(text);
    }
    onLogInPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }
    onSignUpPress() {
        console.log('sign up press')
        const { email, password, repeatPassword} = this.props;
        this.props.signupUser({ email, password, repeatPassword })
  



     
    }

    componentDidUpdate(prevProps) { 
        //console.log( user);
        const { user, navigation } = this.props
        console.log( user);
        return (prevProps.user != user) ? navigation.navigate('drawerStack') : null
    };

    renderError() {
        
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={ styles.errorTextStyle }> 
                        {this.props.error}
                    </Text>
                </View>    
            );
        }
    }
    renderButton() {

        if( this.props.loading) {
           return  <Spinner style={{flex: 2}} size="large"/>
        }
        if (this.state.SignUpPage) {
            return (
                <CardSection style={styles.buttonSection} >
                    <Button 
                        onPress={this.onSignUpPress.bind(this)} 
                        style={styles.buttonStyle} 
                        buttonTextStyle={styles.buttonTextStyle}
                    >
                    Sign Up
                    </Button>  
                    <Button onPress={this.togglePages} style={styles.buttonBackStyle}>Log In</Button> 
                </CardSection> 
            )

        }
        return (
            <CardSection style={styles.buttonSection} >
                <Button 
                    onPress={this.onLogInPress.bind(this)} 
                    style={styles.buttonStyle} 
                    buttonTextStyle={styles.buttonTextStyle}
                >
                Log In
                </Button>  
                <Button buttonTextStyle={styles.buttonBackTextStyle} onPress={this.togglePages} style={styles.buttonBackStyle}>Sign Up</Button> 
            </CardSection> 
        )
    }
    renderHeader = () => {

        const { SignUpPage } = this.state
        
        const styleLogIn = () => SignUpPage ? styles.window : styles.currentWindow
        const styleSignUp = () => SignUpPage ? styles.currentWindow : styles.window

        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity disabled={!(SignUpPage)} onPress={this.togglePages}>
                    <Text style={styleLogIn()}>   
                        LogIn
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={SignUpPage} onPress={this.togglePages}>
                    <Text style={styleSignUp()}>   
                        SignUp
                    </Text>
                </TouchableOpacity>
            </View>

         );
    }

    renderReapetPassword() {
        if(this.state.SignUpPage) { 
            return (
                <View style={styles.lineStyle}>
                    <Icon 
                        style={styles.IconStyle} 
                        type="Ionicons" name="md-key"
                        size={28} 
                        color={'#b3b3b3'}
                    />
                    <CardSection style={styles.inputStyle}> 
                        <Input 
                            label={false}
                            secureTextEntry
                            placeholder="Repeat Password"
                            onChangeText={this.onRepeatPasswordChange.bind(this)}
                            value={this.props.passwordRepeat}    
                        />
                    </CardSection>
                </View>
            )
        }
    }

    render() {
        return (
             <Wrapper> 
                <TopBar style={{ backgroundColor: '#66b3ff' }}> 
                    <GoBackIcon onIconPress={this.onBackIconPress}/>
                    
                </TopBar>
                <CardSection style={styles.iconSectionStyle}>
                    <Icon 
                        style={styles.IconStyle} 
                        type="Ionicons" name="md-contact"
                        size={65} 
                        color={'#ffffff'}
                    />
                    {this.renderHeader()}
                </CardSection>
                
                <View style={styles.inputSection}> 
                    <View style={styles.lineStyle}>
                        <Icon 
                                style={styles.IconStyle} 
                                type="Ionicons" name="md-mail"
                                size={22} 
                                color={'#b3b3b3'}
                        />
                        <CardSection style={styles.inputStyle}> 
                        
                            
                            <Input 
                                label={false}
                                placeholder="Email"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                        </CardSection>
                    </View>
                    <View style={styles.lineStyle}>
                        <Icon 
                            style={styles.IconStyle} 
                            type="Ionicons" name="md-key"
                            size={28} 
                            color={'#b3b3b3'}
                        />
                        <CardSection style={styles.inputStyle}> 
                       
                        <Input 
                            label={false}
                            secureTextEntry
                            placeholder="Password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}    
                        />
                        </CardSection>
                    </View>    
                    {this.renderReapetPassword()}
                    {this.renderError()}
                </View>
                {this.renderButton()}
             </Wrapper>
        )
    }
}
const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    headerContainer: {
        //backgroundColor: '#66b3ff',
      //  justifyContent: 'center',
       // alignItems: 'center',
        flexDirection: 'row',

        //flex: 1,


    },
    currentWindow: {
        fontSize: 17,
        padding: 5,
        color: '#ffffff',
        opacity: 0.9,
        fontWeight: '600'
    },
    window: {
        opacity: 0.7,
        fontSize: 17,
        padding: 5,
        color: '#ffffff',
        fontWeight: '600'
    },
    inputStyle: {
        width: '80%',
        alignSelf: 'center',
        
    },
    buttonStyle: {
        width: '70%', 
        height: 40, 
        flex: 0, 
        borderWidth: 0, 
        alignSelf: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#0073e6',
        fontSize: 22,
       
    },
    buttonSection: {
        width: '100%', 
        alignSelf: 'center',
        borderBottomWidth: 0,
        flex: 2,
        flexDirection: 'column',
        padding: 0,
        margin: 0,
    },
    buttonTextStyle: {
        color: '#fafafa',
    },
    buttonBackTextStyle: {
        color: '#fafafa',
    },
    inputSection: {
       flex: 3,
       justifyContent: 'center',
       alignItems: 'center',
    },
    lineStyle: {
        flexDirection: 'row',
        marginLeft: 40,
        marginRight: 40,
        margin: 10,
        
     },
    IconStyle: {
        alignSelf: 'center',
        marginRight: 10,

    },
    buttonBackStyle: {
        width: '70%', 
        height: 40, 
        flex: 0, 
        borderWidth: 0, 
        alignSelf: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#404040',
        opacity: 0.2,
        fontSize: 22,
       
    },
    iconSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        border: 0,
        backgroundColor: '#66b3ff',
        flexDirection: 'column',
        flex: 2,

    },
}

const mapStateToProps = state =>   {
    return {
        email: state.auth.email,
        password: state.auth.password,
        repeatPassword: state.auth.repeatPassword,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user
    };
};
export default connect(mapStateToProps, { 
    repeatPasswordChanged, 
    emailChanged, 
    passwordChanged, 
    loginUser,
    signupUser
})(LoginForm);