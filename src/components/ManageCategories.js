import React, { Component } from 'react';
import { MenuIcon, Wrapper, UserIcon, CircleButton, Messeage } from './common';
import UserCategoriesList from './UserCategoriesList';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { categoryDelete, fetchCategories, logoutUser } from '../actions';



class ManageCategories extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.user != this.props.user) { return (this.props.fetchCategories()) }
    }

    componentDidMount() {
        this.props.navigation.setParams({ LogInLogOut: this._LogInLogOut });
    }

    state = {
        isButtonClicked: false,
        clickedCategory: '',
        showModal: this.props.user == null

    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Categories',
            headerRight: (
                <View style={{ paddingRight: 20, paddingBottom: 15 }}>
                    <UserIcon onIconPress={navigation.getParam('LogInLogOut')} />
                </View>
            ),
        }
    };

    _LogInLogOut = () => {
        const { navigation, user, logoutUser } = this.props
        return (user != null) ? logoutUser() : navigation.navigate('logIn', { title: 'LOGIN' })
    };

    onAccept = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('LogInForm', { title: 'LOGIN' }, { updateData: this.updateData });
    }
    onDecline = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('Game');

    }
    updateData = data => {
        console.log(data);
        this.setState(data)

    };




    buttonNotClicked = () => this.setState({ clickedCategory: '', isButtonClicked: false });

    buttonClicked = (category) => this.setState({ clickedCategory: category, isButtonClicked: true });

    onCreateButtonPress = () => this.props.navigation.navigate('createCategory', { title: 'Create New Category' });

    onDeleteButtonPress = () => {
        const { clickedCategory } = this.state;
        this.props.categoryDelete({ clickedCategory });
        this.buttonNotClicked()
    }

    renderButtons = () => {
        if (this.state.isButtonClicked) {
            return (
                <View style={styles.buttonsSection}>
                    <CircleButton onPress={this.buttonNotClicked} icon="chevron-left" color="#999999" />
                    <CircleButton onPress={this.onDeleteButtonPress} icon="trash-2" color="#999999" />
                    <CircleButton icon="edit" color="#999999" />
                </View>
            )
        }
        return <CircleButton onPress={this.onCreateButtonPress} icon="plus" color="#6699ff" />

    }
    renderList = () => {
        if (!(this.props.userCategories == '')) {
            return (
                <UserCategoriesList
                    clickedCategory={this.state.clickedCategory}
                    onItemPress={this.buttonClicked}
                    textStyle={styles.textStyleList} />
            )
        }
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
                <View style={{ alignSelf: 'center', flex: 2, width: '50%', maxWidth: 200 }}>
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
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    wrapperStyle: {
        backgroundColor: 'white',
    },
    listSection: {
        flex: 10,
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
       //lineHeight: 20,
    },
}
const mapStateToProps = state => {
    return {
        userCategories: state.cat.userCategories,
        customCategories: state.cat.customCategories,
        user: state.auth.user
    }
};

export default connect(mapStateToProps, { logoutUser, categoryDelete, fetchCategories })(ManageCategories);