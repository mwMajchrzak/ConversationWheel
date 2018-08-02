import React, { Component } from 'react';
import { View, Button } from 'react-native';
import  { connect } from 'react-redux'

import { Wrapper, LogInButton, TopBar, MenuIcon } from  './common';
import HeaderSection from './HeaderSection';
import Wheel from './Wheel';
import CategoryMenu from './CategoryMenu';
import { logoutUser, fetchCustomCategories, fetchCategories } from '../actions';

class Game extends Component {

    componentWillMount() {
        this.props.fetchCustomCategories();
        //console.log('willmount', this.props.user);
        //if(this.props.user != null) this.props.fetchCategories();   
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user !== this.props.user) this.props.fetchCategories();
      }
  
    state = {
        wasWheelSpinned: true,
        isMenuOpen: 'false',
    }

    renderHeaderText() {
        const { wasWheelSpinned, topic } = this.state
        return (wasWheelSpinned ? `Let's talk about ${topic}` : "Spin the wheel and find a random topic!");
    }
    renderLogInButtonText() {
        return (this.props.user != null) ? 'LogOut' : 'LogIn';
    }

    onMenuIconPress = () => this.props.navigation.openDrawer();

    onCreateButtonPress = () => this.props.navigation.navigate('createCategory');

    toggleMenu = ()  => {
        const currentState = this.state.isMenuOpen
        this.setState({ isMenuOpen: !currentState});   
    };

    passOnPressEvent = () => {
        const { navigation, user, logoutUser } = this.props
        return (user != null) ? logoutUser() : navigation.navigate('LogInForm')
    };

    render() {
        return (
            <Wrapper> 
                <TopBar> 
                    <MenuIcon onIconPress={this.onMenuIconPress}/>
                    <LogInButton onPressEvent={this.passOnPressEvent}> {this.renderLogInButtonText()} </LogInButton>
                </TopBar>
                <HeaderSection text={this.renderHeaderText()}/>
                <CategoryMenu 
                    onCreateButtonPress={this.onCreateButtonPress}
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

const mapStateToProps = state => { return { user: state.auth.user } };

export default connect(mapStateToProps, { logoutUser, fetchCustomCategories, fetchCategories })(Game);