import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { signupUser, repeatPasswordChanged, emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';
import { Text, View, TouchableOpacity } from 'react-native';
import { GoBackIcon, TopBar, Wrapper, ButtonLogInForm  } from './common'; 
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

    asignOnPressEvent = () => { 
        return !(this.state.SignUpPage) ? this.onLogInPress.bind(this) : this.onSignUpPress.bind(this)
    }

    asignCurrentText = () => { return !(this.state.SignUpPage) ? 'LOGIN' : 'SIGNUP' }

    asignText = () => { return !(this.state.SignUpPage) ? 'SIGNUP' : 'LOGIN' }
    
    renderButton = () => {
    
        if( this.props.loading) {
           return (
            <CardSection style={styles.buttonSection}>
               <Spinner style={{flex: 2}} size="large"/>
           </CardSection>
           )}
        return (
            <CardSection style={styles.buttonSection}>
                <ButtonLogInForm isCurrent={true} onPress={this.asignOnPressEvent()}>
                 {this.asignCurrentText()}
                </ButtonLogInForm>  
                <ButtonLogInForm isCurrent={false} onPress={this.togglePages}>
                    {this.asignText()}
                </ButtonLogInForm> 
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
                    
                    <CardSection style={styles.inputStyle}> 
                        <Input 
                            label={false}
                            secureTextEntry
                            placeholder="Repeat Password"
                            onChangeText={this.onRepeatPasswordChange.bind(this)}
                            value={this.props.passwordRepeat}    
                        />
                        <Icon 
                        style={styles.IconStyle} 
                        type="Ionicons" name="md-key"
                        size={28} 
                        color={'#C8C8C8'}
                             />
                    </CardSection>
                </View>
            )
        }
    }

    render() {
        return (
             <Wrapper style={styles.wrapperStyle}> 
                <TopBar style={{ backgroundColor: '#66b3ff' }}> 
                    <GoBackIcon onIconPress={this.onBackIconPress}/>
                    
                </TopBar>
                <CardSection style={styles.iconSectionStyle}>
                    <Icon 
                        style={styles.IconStyle} 
                        type="Ionicons" name="md-contact"
                        size={70} 
                        color={'#ffffff'}
                    />
                    {this.renderHeader()}
                </CardSection>
                
                <View style={styles.inputSection}> 
                    <View style={styles.lineStyle}>
                    <CardSection style={styles.inputStyle}> 
                            <Input 
                                label={false}
                                placeholder="Email"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                            <Icon 
                                style={styles.IconStyle} 
                                type="Ionicons" name="md-mail"
                                size={22} 
                                color={'#c8c8c8'}
                             />
                        </CardSection>
                    </View>
                    <View style={styles.lineStyle}>
                        
                        <CardSection style={styles.inputStyle}> 
                       
                        <Input 
                            label={false}
                            secureTextEntry
                            placeholder="Password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}    
                        />
                        <Icon 
                            style={styles.IconStyle} 
                            type="Ionicons" name="md-key"
                            size={28} 
                            color={'#c8c8c8'}
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
    wrapperStyle: {
        backgroundColor: '#fefefe',
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    headerContainer: {
        flexDirection: 'row',
    },
    currentWindow: {
        fontSize: 17,
        padding: 5,
        paddingTop: 20,
        color: '#ffffff',
        opacity: 0.9,
        fontWeight: '600'
    },
    window: {
        opacity: 0.7,
        fontSize: 17,
        padding: 5,
        paddingTop: 20,
        color: '#ffffff',
        fontWeight: '600'
    },
    inputStyle: {
        width: '92%',
        alignSelf: 'center',
        padding: 17,

        backgroundColor: 'white',
        borderWidth: 0.5,
        height: 55,
        borderRadius: 10,

        shadowOffset:{  width: 0,  height: 0 },

        shadowRadius: 10,
        shadowColor: '#1a1a1a',
        shadowOpacity: 0.2,
    },
    buttonSection: {
        width: '100%', 
        alignSelf: 'center',
        borderBottomWidth: 0,
        flex: 5,
        flexDirection: 'column',
        padding: 0,
        margin: 0,
    },
    buttonBackTextStyle: {
        color: '#fafafa',
    },
    inputSection: {
       flex: 8,
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
    },
    iconSectionStyle: {
        paddingBottom: 60,
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