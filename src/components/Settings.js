import React, { Component } from 'react';
import {MenuIcon, Wrapper, TopBar,LogInButton}  from './common';


class Settings extends Component {

    onIconPress = () => this.props.navigation.openDrawer();

    render () {
        return (
        <Wrapper> 
            <TopBar> 
                <MenuIcon onIconPress={this.onIconPress}/>
                <LogInButton> LogIn </LogInButton>
            </TopBar>
        </Wrapper>
        )
    }
}
export default Settings;
