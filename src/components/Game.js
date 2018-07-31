import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Wrapper, LogInButton, TopBar, MenuIcon } from  './common';
import Icon from 'react-native-vector-icons/Feather';
import HeaderSection from './HeaderSection';
import Wheel from './Wheel';
import CategoryMenu from './CategoryMenu';
import  { connect } from 'react-redux'
import { logoutUser, fetchCustomCategories } from '../actions';

class Game extends Component {

    componentDidMount() {
      this.props.fetchCustomCategories();
      console.log('props customCategories', this.props.customCategories);
    }

    state = {
        wasWheelSpinned: true,
        topic:'tomato',
        isMenuOpen: 'false',
    }

    renderHeaderText() {
        const { wasWheelSpinned, topic } = this.state
        return (wasWheelSpinned ? `Let's talk about ${topic}` : "Spin the wheel and find a random topic!");
    }
    renderLogInButtonText() {
        console.log('user', this.props.user);
        return (this.props.user != null) ? 'LogOut' : 'LogIn';
    }

    onMenuIconPress = () => this.props.navigation.openDrawer();

    onCreateButtonPress = () => this.props.navigation.navigate('createCategory');

    toggleMenu = ()  => {
           // console.log('toggle', this.props.customCategories);
            const currentState = this.state.isMenuOpen
            this.setState({ isMenuOpen: !currentState});   
    };

    passOnPressEvent = () => {
        const { navigation, user, logoutUser } = this.props
        return (user != null) ? logoutUser() : navigation.navigate('LogInForm')
    }

    render() {
        console.log('tuuuuuu render game ', this.props.navigation)
        return (
            <Wrapper> 
                <TopBar> 
                    <MenuIcon onIconPress={this.onMenuIconPress}/>
                    <LogInButton onPressEvent={this.passOnPressEvent}> {this.renderLogInButtonText()} </LogInButton>
                </TopBar>
                <HeaderSection text={this.renderHeaderText()}/>
                <CategoryMenu 
                    onCreateButtonPress={this.onCreateButtonPress}
                    categoriesObject={this.props.customCategories}
                    isMenuOpen={this.state.isMenuOpen}
                    toggleMenu={this.toggleMenu}/>
                <Wheel />
            </Wrapper>
            
        );
    };
};

const styles = {
    IconMenuStyle: {
        margin: 1
    }
}

const mapStateToProps = state =>   {
    console.log('mapstate to props state', state.cat.customCategories);
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        customCategories: state.cat.customCategories
    };
    console.log('mapstate to props', this.props.customCategories);
};
export default connect(mapStateToProps, { logoutUser, fetchCustomCategories })(Game);