import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { signupUser, repeatPasswordChanged, emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';
import { Text, View, TouchableOpacity } from 'react-native';
import { GoBackIcon, TopBar, Wrapper } from './common'; 

class LoginForm extends Component {
    state = {
        SignUpPage: false
    }
    togglePages = ()  => this.setState({ SignUpPage: !this.state.SignUpPage });
    
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
           return  <Spinner size="large"/>
        }
        else if(this.state.SignUpPage) { 
            return (
                <Button 
                    onPress={this.onSignUpPress.bind(this)} 
                    style={styles.buttonStyle} 
                    buttonTextStyle={styles.buttonTextStyle}
                >
                    Sign Up 
                </Button>   
              
            );
        }
        return (
            <Button 
                onPress={this.onSignUpPress.bind(this)} 
                style={styles.buttonStyle} 
                buttonTextStyle={styles.buttonTextStyle}
            >
            Log In
            </Button>  
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
                <CardSection style={styles.inputStyle}> 
                    <Input 
                        label={false}
                        secureTextEntry
                        placeholder="Repeat Password"
                        onChangeText={this.onRepeatPasswordChange.bind(this)}
                        value={this.props.passwordRepeat}    
                    />
                </CardSection>
            )
        }
    }

    render() {
        return (
             <Wrapper> 
                <TopBar> 
                    <GoBackIcon onIconPress={this.onBackIconPress}/>
                    
                </TopBar>
                {this.renderHeader()}
                <View style={styles.inputSection}> 
                    <CardSection style={styles.inputStyle}> 
                        <Input 
                            label={false}
                            placeholder="Email"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>
                    <CardSection style={styles.inputStyle}> 
                        <Input 
                            label={false}
                            secureTextEntry
                            placeholder="Password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}    
                        />
                    </CardSection>
                    {this.renderReapetPassword()}
                    {this.renderError()}
                </View>
                <CardSection style={styles.buttonSection} > 
                    {this.renderButton()}
                </CardSection>
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
        alignSelf: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    currentWindow: {
        fontSize: 20,
        padding: 5,
        color: '#1a1a1a'
    },
    window: {
        opacity: 0.7,
        fontSize: 20,
        padding: 5,
        color: '#1a1a1a'
    },
    inputStyle: {
        width: '80%',
        alignSelf: 'center',
        
    },
    buttonStyle: {
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
    buttonSection: {
        alignSelf: 'center',
        borderBottomWidth: 0,
        flex: 2,
    },
    buttonTextStyle: {
        color: '#f2f2f2',
    },
    inputSection: {
       flex: 3,
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