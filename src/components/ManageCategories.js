import React, { Component } from 'react';
import { Wrapper, UserIcon, CircleButton, Messeage, Spinner } from './common';
import UserCategoriesList from './UserCategoriesList';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { categoryDelete, fetchCategories, logoutUser, clickedCategoryChanged } from '../actions';
import colors from '../styles/colors';
import UserButtonComponent from './common/UserButtonComponent'
//import { runInThisContext } from 'vm';


class ManageCategories extends Component {

    componentWillReceiveProps(nextProps) { nextProps.user != this.props.user ? this.props.fetchCategories() : null }

    componentDidMount() {  this.props.navigation.setParams({ LogInPress: this._LogInPress, UserPress: this._UserPress }) }

    componentWillMount() { this.setState({ showModal: this.props.user == null }) }

    state = { showModal: true }


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


   // _LogInPress = () => { this.props.navigation.navigate('logIn', {title: 'LOGIN', refresh: this.refreshFunction }) };
    _UserPress = () => { 
        const { navigation, logoutUser } = this.props
            navigation.navigate('Game')
            logoutUser()
    };

 

    onAccept = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('LogInForm', { title: 'LOGIN', refresh: this.refreshFunction });
    }
    
    onDecline = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('Game');
    }

    refreshFunction = () => { this.setState({ showModal: this.props.user == null }) };

    buttonNotClicked = () => this.props.clickedCategoryChanged('');

    buttonClicked = (category) => this.props.clickedCategoryChanged(category);

    onCreateButtonPress = () => this.props.navigation.navigate('createCategory');

    onEditButtonPress = () => this.props.navigation.navigate('editCategory');


    onDeleteButtonPress = () => {
        const { categoryDelete, clickedCategory } = this.props
        categoryDelete({ clickedCategory });
        this.buttonNotClicked()
    }

    renderButtons = () => {
        if (!(this.props.clickedCategory == '')) {
            return (
                <View style={{ justifyContent: 'space-between', width: '60%', flexDirection: 'row', }}>
                    <CircleButton size={50} onPress={this.buttonNotClicked} icon="chevron-left" color={colors.pink} />
                    <CircleButton size={60} onPress={this.onDeleteButtonPress} icon="trash-2" color={colors.pink} />
                    <CircleButton size={50} icon="edit" onPress={this.onEditButtonPress} color={colors.pink} />
                </View>
            )
        }
        return <CircleButton size={60} onPress={this.onCreateButtonPress} icon="plus" color={colors.darkBlue} />

    }
    renderList = () => {

        const { loading, userCategories } = this.props

        if (loading) { return <Spinner /> }

        if (!(userCategories == '')) { return <UserCategoriesList onItemPress={this.buttonClicked} /> }

        return (
            <View style={styles.instrucitonContainerStyle}>
                <Text style={styles.instructionTitleStyle}> Create category!</Text>
                <Text style={styles.instructionStyle}> You didn't create any categories yet.</Text>
                <Text style={styles.instructionStyle}> Press add button to create the first one.</Text>
            </View>
        );
    }

    render() {
        return (
            <Wrapper style={styles.wrapperStyle}>
                <View style={styles.listSection}>
                    {this.renderList()}
                </View>
                <View style={styles.buttonsSection}>
                    {this.renderButtons()}
                </View>
                <Messeage
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                />
            </Wrapper>
        )
    }
}
const styles = {

    textStyleList: {
        alignSelf: 'flex-start',
        paddingLeft: 20
    },

    buttonsSection: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 0,
        padding: 27,
        width: '100%',

        // shadowOffset:{  width: 0,  height: 0 },
        // shadowRadius: 20,
        // shadowColor: '#fff',
        // shadowOpacity: 1,
    },
    wrapperStyle: {
        backgroundColor: 'white',
    },
    listSection: {
        height: '100%',
        paddingTop: 15,

    },
    instrucitonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionTitleStyle: {
        fontSize: 30,
        color: '#808080',
        margin: 20,
        fontWeight: '400',
    },
    instructionStyle: {
        fontSize: 16,
        color: '#9999',
        fontWeight: '600',
        lineHeight: 20,
    },
}
const mapStateToProps = state => {
    return {
        userCategories: state.cat.userCategories,
        customCategories: state.cat.customCategories,
        user: state.auth.user,
        loading: state.cat.loading,
        clickedCategory: state.cat.clickedCategory,

    }
};

export default connect(mapStateToProps, { clickedCategoryChanged, logoutUser, categoryDelete, fetchCategories })(ManageCategories);