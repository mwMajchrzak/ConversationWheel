import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Wrapper, LogInButton, TopBar, MenuIcon } from  './common';
import Icon from 'react-native-vector-icons/Feather';
import HeaderSection from './HeaderSection';
import Wheel from './Wheel';
import CategoryMenu from './CategoryMenu';

class Game extends Component {

    state = {
        wasWheelSpinned: true,
        topic:'tomato',
        isMenuOpen: 'false',
    }

    renderHeader() {
        return (this.state.wasWheelSpinned ? `Let's talk about ${this.state.topic}` : "Spin the wheel and find a random topic!");
    }

    onIconPress = () => this.props.navigation.openDrawer();

    toggleMenu = ()  => {
            const currentState = this.state.isMenuOpen
            this.setState({ isMenuOpen: !currentState});   
    };

    render() {

        return (
            <Wrapper> 
                <TopBar> 
                    <MenuIcon onIconPress={this.onIconPress}/>
                    <LogInButton> LogIn </LogInButton>
                </TopBar>
                <HeaderSection text={this.renderHeader()}/>
                <CategoryMenu 
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
export default Game;