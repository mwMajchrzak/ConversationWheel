import React, { Component } from 'react';
import { MenuIcon, Wrapper, UserIcon, CircleButton, Messeage, Spinner } from './common';
import UserCategoriesList from './UserCategoriesList';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { categoryDelete, fetchCategories, logoutUser } from '../actions';
import colors from '../styles/colors';



class ManageCategories extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.user != this.props.user) { 
            return (
               // this.setState({ isLoading: true })
                this.props.fetchCategories()
            ) 
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ LogInLogOut: this._LogInLogOut });
    }

    state = {
        isLoading: false,
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
        if(user != null) {
            navigation.navigate('Game')
            logoutUser()
        } 
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
                <View style={{ justifyContent: 'space-between', width: '60%', flexDirection: 'row',}}>
                    <CircleButton size= {50} onPress={this.buttonNotClicked} icon="chevron-left" color={colors.pink} />
                    <CircleButton size= {60} onPress={this.onDeleteButtonPress} icon="trash-2" color={colors.pink} />
                    <CircleButton size= {50} icon="edit" color={colors.pink} />
                </View>
            )
        }
        return <CircleButton size={60} onPress={this.onCreateButtonPress} icon="plus" color={colors.darkBlue} />

    }
    renderList = () => {
        if(this.props.loading ){
            return (
                <Spinner />
            )
        }
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
        console.log('loading', this.props.loading)

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
        
        //flex: 1,
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
        loading: state.cat.loading
    }
};

export default connect(mapStateToProps, { logoutUser, categoryDelete, fetchCategories })(ManageCategories);