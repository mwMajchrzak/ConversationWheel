import React, { Component } from 'react';
import { connect } from 'react-redux'
import { categorySave, fillInputs, categoryCreate, saveTopic, topicChanged, categoryChanged } from '../actions';
import { Button, GoBackIcon, Wrapper } from './common';
import EditDone from './common/EditDone';
import { View } from 'react-native';
import colors from '../styles/colors'
import CategoryForm from './CategoryForm';

class EditCategory extends Component {

    state = { error: false }

    removeError = () => { this.setState({ error: false }) }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <View style={{ paddingLeft: 20, paddingBottom: 15 }}>
                    <GoBackIcon onIconPress={navigation.getParam('onBackIconPress')} />
                </View>
            ),
            headerRight: (
                <EditDone />
            ),
        }
    };

    componentWillMount() {
        const { clickedCategory, userCategories, fillInputs } = this.props
        const category = userCategories.filter(function (item) { return item.key === clickedCategory })
        fillInputs(category[0].category, category[0].topics)
    }

    componentDidMount() {
        this.props.navigation.setParams({ onBackIconPress: this._onBackIconPress });
    }

    _onBackIconPress = () => {
        const { navigation, fillInputs } = this.props
        navigation.goBack(null)
        fillInputs('', '')
    }

    onEditButtonPress() {
        const { topics, category, clickedCategory, userCategories, categorySave, navigation } = this.props;
        const alreadyExists = userCategories != '' && userCategories.some((el) => { return (el.key !== clickedCategory && el.category === category) });
        const key = clickedCategory

        if (alreadyExists) { this.setState({ error: true }) }
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

    render() {
        console.log('state', this.state.deleteMode)
        return (
            <Wrapper>
                <CategoryForm error={this.state.error} removeError={this.removeError} {...this.props} />
                <View style={styles.buttonSection}>
                    {this.renderCategoryButton()}
                </View>
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
        userCategories: state.cat.userCategories,
        clickedCategory: state.cat.clickedCategory
    };
};
export default connect(mapStateToProps, { categorySave, fillInputs, categoryCreate, saveTopic, topicChanged, categoryChanged })(EditCategory);