import React, { Component, componentDidUpdate } from 'react';
import { connect } from 'react-redux'
import { categorySave, fillInputs, categoryCreate, saveTopic, topicChanged, categoryChanged } from '../actions';
import { CardSection, Input, Button, Spinner, CircleButton, GoBackIcon, TopBar, Wrapper, Messeage } from './common';
import { Text, View, ScrollView } from 'react-native';
//import TopicsList from './TopicsList'
import colors from '../styles/colors'
import CategoryForm from './CategoryForm';

class EditCategory extends Component {

    state = {
        //showModal: this.props.user == null,
        error: false
    }

    removeError = () => { this.setState({ error: false })  }
    static navigationOptions = ({ navigation }) => {

        const { state } = navigation;
        return {
            headerLeft: (
                <View style={{ paddingLeft: 20, paddingBottom: 15 }}>
                    <GoBackIcon onIconPress={navigation.getParam('onBackIconPress')} />
                </View>
            ),
        }
    };


     componentWillMount() {
       const { clickedCategory, userCategories, fillInputs } = this.props 
       const category = userCategories.filter(function(item) {return item.key === clickedCategory}) 
        fillInputs(category[0].category, category[0].topics)
     }






    componentDidMount() {
        this.props.navigation.setParams({ onBackIconPress: this._onBackIconPress });
    }
    _onBackIconPress = () => {
        const { navigation, fillInputs } = this.props
        navigation.goBack(null)
        fillInputs('','')
        // if( navigation.state.params != null ) { state.params.updateData({ showModal: true }) }
    }


    onEditButtonPress() {
        const { topics, category, clickedCategory, userCategories, categorySave, navigation } = this.props;
        const alreadyExists = userCategories !='' && userCategories.some((el) => { return (el.key !== clickedCategory && el.category === category) });
        const key = clickedCategory

        if(alreadyExists) { this.setState({ error: true }) }

        else {
            categorySave({ category, topics, key }) 
              navigation.goBack(null)
        }
    }

    renderCategoryButton = () => {
        const { topics, category } = this.props
        return (
            <Button
                isDisabled={(topics == '') || (category == '')}
                onPress={this.onEditButtonPress.bind(this)}
                style={styles.categoryButton}
                buttonTextStyle={styles.buttonTextStyle}
            >
                SAVE
            </Button>
        );
    }
    // onAccept = () => {
    //     this.setState({ showModal: false });
    //     this.props.navigation.navigate('LogInForm', { title: 'LOGIN' }, { updateData: this.updateData });
    // }
    // onDecline = () => {
    //     this.setState({ showModal: false });
    //     this.props.navigation.navigate('Game');
    // }

    render() {
        return (
            <Wrapper>
                <CategoryForm  error={this.state.error} removeError={this.removeError} {...this.props}/>
                <View style={styles.buttonSection}>
                    {this.renderCategoryButton()}
                </View>
                {/* <Messeage
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                /> */}
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
      //  user: state.auth.user,
        userCategories: state.cat.userCategories,
        clickedCategory: state.cat.clickedCategory
    };
};
export default connect(mapStateToProps, { categorySave, fillInputs, categoryCreate, saveTopic, topicChanged, categoryChanged })(EditCategory);