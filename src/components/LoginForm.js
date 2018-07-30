import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Text, View } from 'react-native';
import { GoBackIcon, TopBar, Wrapper } from './common'; 

class LoginForm extends Component {
    
    onBackIconPress = () => this.props.navigation.navigate('drawerStack');

    onEmailChange(text) {
        this.props.emailChanged(text);

    }
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }
    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
        console.log('button was pressed');
    }

    componentDidUpdate(prevProps) { 
        const { user, navigation } = this.props
        return prevProps.user != user ? navigation.navigate('drawerStack') : null 
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
        return (
            <Button onPress={this.onButtonPress.bind(this)}> 
                Log in
            </Button>
         );
    }
    


    render() {


        console.log('login method LogInForm', this.props.loginUser);
        return (
             <Wrapper> 
                <TopBar> 
                    <GoBackIcon onIconPress={this.onBackIconPress}/>
                </TopBar>
                 <CardSection> 
                     <Input 
                     label="Email"
                     placeholder="email@gmail.com"
                     onChangeText={this.onEmailChange.bind(this)}
                     value={this.props.email}
                     />
                 </CardSection>
                 <CardSection> 
                     <Input 
                     secureTextEntry
                     label="Password"
                     placeholder="password"
                     onChangeText={this.onPasswordChange.bind(this)}
                     value={this.props.password}    
                 />
             </CardSection>
             { this.renderError() }
             <CardSection> 
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
    }
}

const mapStateToProps = state =>   {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user
    };
};
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);