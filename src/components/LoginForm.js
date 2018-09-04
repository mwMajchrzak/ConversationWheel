import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { signupUser, repeatPasswordChanged, emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';
import { Text, View, TouchableOpacity } from 'react-native';
import { GoBackIcon, TopBar, Wrapper, ButtonLogInForm  } from './common'; 
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors'

class LoginForm extends Component {
    state = {
        SignUpPage: false
    }

    componentDidMount() {
        this.props.navigation.setParams({ onBackIconPress: this._onBackIconPress });
    }


      static navigationOptions = ({ navigation }) => {

        const {state} = navigation;
        return {
        title: `${state.params.title}`,

        headerLeft: (
            <View style={{ paddingLeft: 20, paddingBottom: 15 }}>
                <GoBackIcon onIconPress={navigation.getParam('onBackIconPress')}/>
            </View>
        ),
        
    }};

    togglePages = ()  => {

        this.setState({ SignUpPage: !(this.state.SignUpPage) });
        const {setParams} = this.props.navigation;
        if (!(this.state.SignUpPage)) {
            return setParams({ title: 'SIGNUP' }) 
        }
        return setParams({ title: 'LOGIN' })
    }

    
    _onBackIconPress = () =>   { 
        const { goBack, state } = this.props.navigation
        console.log( state.params)
       state.params.refresh()
        goBack(null)
   
        //if( this.props.user != null ) { state.params.updateData({ showModal: true }) }
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
        return (prevProps.user != user) ? navigation.goBack(null) : null
    };

   renderError() {
        
        if (this.props.error) {
            return (
                    <Text style={ styles.errorTextStyle }> 
                        {this.props.error}
                    </Text>
            );
        }
    }

    asignOnPressEvent = () => { 
        return !(this.state.SignUpPage) ? this.onLogInPress.bind(this) : this.onSignUpPress.bind(this)
    }

    asignCurrentText = () => { return !(this.state.SignUpPage) ? 'LOGIN' : 'SIGNUP' }

    asignText = () => { return !(this.state.SignUpPage) ? 'SIGNUP' : 'LOGIN' }
    
    renderButton = () => {
    
        if( this.props.loading ) {
           return (
            <CardSection style={styles.buttonSection}>
               <Spinner  size="large"/>
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
                 <View style={styles.formStyle}> 
                    <View style={styles.iconSectionStyle}>
                        <Icon 
                    
                            type="Ionicons" name="md-contact"
                            size={60} 
                            color={colors.white}
                        />
                    </View>
                
                    <View style={styles.inputSection}> 
                        <View style={styles.inputStyle}> 
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
                        </View>
                    
        
                        <View style={styles.inputStyle}> 
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
                        </View>
                        {this.renderReapetPassword()}
                        <View style={{height: 20}}>
                            {this.renderError()}  
                        </View>    
                    </View>    
    
                     
                </View>
                {this.renderButton()} 
             </Wrapper>
     
        )
    }
}
const styles = {
    wrapperStyle: {
        flexDirection: 'column',
      
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red', 
        padding: 0,
        margin: 0,
    },

    inputSection: {
        minHeight: 160,
        flex: 4,
        justifyContent: 'center'
    },
    
    inputStyle: {
        width: '76%',
        alignSelf: 'center',
        padding: 17,
        backgroundColor: colors.white,
        height: 55,
        borderRadius: 10,

        shadowOffset:{  width: 0,  height: 0 },
        shadowRadius: 10,
        shadowColor: '#1a1a1a',
        shadowOpacity: 0.2,

        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',

       
        marginLeft: 40,
        marginRight: 40,
        margin: 10,
    },
    buttonSection: {
        width: '100%', 
        alignSelf: 'center',
        borderBottomWidth: 0,
        flex: 3,
        flexDirection: 'column',
    },
    buttonBackTextStyle: {
        color: '#fafafa',
    },
    formStyle: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 9,

    },
   
    iconSectionStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
        flexDirection: 'column',
        width: '100%',
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