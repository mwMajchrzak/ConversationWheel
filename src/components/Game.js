import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import { Wrapper, UserIcon, } from './common';
import UserButtonComponent from './common/UserButtonComponent'
import HeaderSection from './HeaderSection';
import Pie from './Pie';
import CategoryMenu from './CategoryMenu';
import { logoutUser, fetchCustomCategories, fetchCategories } from '../actions';


class Game extends Component {

    componentWillMount() {
        this.props.fetchCustomCategories();
        if (this.props.user != null) this.props.fetchCategories();
    }
    componentDidMount() {
        this.props.navigation.setParams({ LogInPress: this._LogInPress, UserPress: this._UserPress });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user != null) { return (this.props.fetchCategories()) }
    }

    state = {
        wasWheelSpinned: false,
        isMenuOpen: false,
        topic: '',
        category: 'Select Category',
        topics: [],
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <UserButtonComponent
                    navigation={navigation}
                    LogInPress={navigation.getParam('LogInPress')}
                    UserPress={navigation.getParam('UserPress')}
                />),
        }
    };

    refreshFunction = () => { console.log('refresh function') };
    _LogInPress = () => { this.props.navigation.navigate('logIn', { title: 'LOGIN', refresh: this.refreshFunction }) };
    _UserPress = () => { this.props.logoutUser() };



    updateCategory = (key, topics, category) => {
        this.setState({ category: category, topics: topics })
        this.toggleMenu()
    };

    renderHeaderText() {
        const { wasWheelSpinned, topic } = this.state
        return (wasWheelSpinned ? `Let's talk about ${topic}` : "Spin the wheel and find a random topic!");
    }



    onCreateButtonPress = () => {
        this.setState({ isMenuOpen: false })
        this.props.navigation.navigate('CreateCategory', { title: 'Create New Category' })
    }

    closeMenu = () => this.setState({ isMenuOpen: false });

    toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.closeMenu}>
                <View style={{ flex: 1 }}>
                    <Wrapper>
                        <HeaderSection style={{ flex: 2 }} text={this.renderHeaderText()} />
                        <CategoryMenu
                            onItemPress={this.updateCategory}
                            selectedCategory={this.state.category}
                            onCreateButtonPress={this.onCreateButtonPress}
                            isMenuOpen={this.state.isMenuOpen}
                            toggleMenu={this.toggleMenu}
                        />
                        <Pie selectedTopics={this.state.topics} />
                    </Wrapper>
                </View>
            </TouchableWithoutFeedback>
        );
    };
};


const mapStateToProps = state => { return { user: state.auth.user } };

export default connect(mapStateToProps, { logoutUser, fetchCustomCategories, fetchCategories })(Game);