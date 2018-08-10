import React, { Component, forceUpdate } from 'react';
import { View, Button, TouchableWithoutFeedback } from 'react-native';
import  { connect } from 'react-redux'

import { Wrapper, LogInButton, TopBar, MenuIcon } from  './common';
import HeaderSection from './HeaderSection';
import Pie from './Pie';
import CategoryMenu from './CategoryMenu';
import { logoutUser, fetchCustomCategories, fetchCategories } from '../actions';

class Game extends Component {

    componentWillMount() {
        this.props.fetchCustomCategories();
        if(this.props.user != null) this.props.fetchCategories();   
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user != null) { return( this.props.fetchCategories()) }
    }
  
    state = { 
        wasWheelSpinned: false,
        isMenuOpen: false,
        topic:'',
        category: 'Select Category', 
        topics: [],
    }

    updateCategory = (category, topics) => {
        this.setState({ category: category, topics: topics })
        this.toggleMenu()
     };

    renderHeaderText() {
        const { wasWheelSpinned, topic } = this.state
        return (wasWheelSpinned ? `Let's talk about ${topic}` : "Spin the wheel and find a random topic!");
    }

    renderLogInButtonText() { return (this.props.user != null) ? 'LogOut' : 'LogIn'}

    onMenuIconPress = () => this.props.navigation.openDrawer();

    onCreateButtonPress = () => this.props.navigation.navigate('createCategory');

    closeMenu = () => this.setState({ isMenuOpen: false});    

    toggleMenu = ()  => this.setState({ isMenuOpen: !this.state.isMenuOpen});   

    passOnPressEvent = () => {
        const { navigation, user, logoutUser } = this.props
        return (user != null) ? logoutUser() : navigation.navigate('LogInForm')
    };

    render() {
        console.log(this.state.topics)
        return (
            <TouchableWithoutFeedback onPress={this.closeMenu}>
                <View style={{ flex: 1}}>
                    <Wrapper> 
                        <TopBar> 
                            <MenuIcon onIconPress={this.onMenuIconPress}/>
                            <LogInButton onPressEvent={this.passOnPressEvent}> {this.renderLogInButtonText()} </LogInButton>
                        </TopBar>
                        <HeaderSection text={this.renderHeaderText()}/>
                        <CategoryMenu 
                            onItemPress={this.updateCategory}
                            selectedCategory={this.state.category}
                            onCreateButtonPress={this.onCreateButtonPress}
                            isMenuOpen={this.state.isMenuOpen}
                            toggleMenu={this.toggleMenu}
                        />
                        <Pie selectedTopics={this.state.topics}/>
                    </Wrapper>
                </View>
            </TouchableWithoutFeedback>
        );
    };
};


const mapStateToProps = state => { return { user: state.auth.user } };

export default connect(mapStateToProps, { logoutUser, fetchCustomCategories, fetchCategories })(Game);