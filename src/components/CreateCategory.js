import React, { Component } from 'react';
import { connect } from 'react-redux'
import { categoryCreate, saveTopic, fillInputs, topicChanged, categoryChanged } from '../actions';
import {  Button,   GoBackIcon,  Wrapper, Messeage } from './common';
import { View } from 'react-native';
import colors from '../styles/colors'
import CategoryForm from './CategoryForm';

class CreateCategory extends Component {

    state = {
        showModal: this.props.user == null,
        error: false
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <View style={{ paddingLeft: 20, paddingBottom: 15 }}>
                    <GoBackIcon onIconPress={navigation.getParam('onBackIconPress')} />
                </View>
            ),
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({ onBackIconPress: this._onBackIconPress });
    }

    _onBackIconPress = () => {
        const { navigation, fillInputs } = this.props
        navigation.goBack(null)
        fillInputs('','')
        // if( state.params != null ) { state.params.updateData({ showModal: true }) }
    }

    removeError = () => { this.setState({ error: false })  }



    onCategoryButtonPress() {
 //const key = Date.now().toString();
        const { topics, category, userCategories, categoryCreate} = this.props;
        const found = userCategories == '' ? false : userCategories.some((el) => { return el.category === category });
        found ? this.setState({ error: true }) : categoryCreate({ category, topics }) 
    }

    renderCategoryButton = () => {
        const { topics, category } = this.props
        return (
            <Button
                isDisabled={(topics == '') || (category == '')}
                onPress={this.onCategoryButtonPress.bind(this)}
                style={styles.categoryButton}
                buttonTextStyle={styles.buttonTextStyle}
            >
                CREATE
            </Button>
        );
    }
    onAccept = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('LogInForm', { title: 'LOGIN' }, { updateData: this.updateData });
    }
    onDecline = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('Game');
    }

    render() {
        return (
            <Wrapper>
                <CategoryForm error={this.state.error} removeError={this.removeError}/>
                <View style={styles.buttonSection}>
                    {this.renderCategoryButton()}
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
    
    buttonSection: {
        flex: 4,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },     
    categoryButton: {
        width: '40%',
        height: 60,
        marginBottom: 15,
        flex: 0,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: colors.darkBlue,
    },
    buttonTextStyle: {
        color: 'white'
    },
}

const mapStateToProps = state => {
    return {
        category: state.cat.category,
        loading: state.cat.loading,
        topic: state.cat.topic,
        topics: state.cat.topics,
        user: state.auth.user,
        userCategories: state.cat.userCategories
    };
};
export default connect(mapStateToProps, { fillInputs, categoryCreate, saveTopic, topicChanged, categoryChanged })(CreateCategory);