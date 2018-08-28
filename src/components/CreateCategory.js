import React, { Component, componentDidUpdate } from 'react';
import { connect } from 'react-redux'
import { categoryCreate, saveTopic, topicChanged, categoryChanged } from '../actions';
import { CardSection, Input, Button, Spinner, CircleButton, GoBackIcon, TopBar, Wrapper, Messeage } from './common';
import { Text, View, ScrollView } from 'react-native';
import TopicsList from './TopicsList'
import colors from '../styles/colors'

class CreateCategory extends Component {

    state = {
        showModal: this.props.user == null,
        error: false
    }

    static navigationOptions = ({ navigation }) => {

        const { state } = navigation;
        return {
            title: `${state.params.title}`,

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
        const { goBack, state } = this.props.navigation
        goBack(null)
        // if( state.params != null ) { state.params.updateData({ showModal: true }) }
    }


    onCategoryChange(text) {
        this.props.categoryChanged(text);
        this.setState({ error: false })
    }

    onTopicChange(text) { this.props.topicChanged(text) }

    onTopicButtonPress = () => { this.props.saveTopic(this.props.topic) }


    onCategoryButtonPress() {
        const { topics, category, userCategories } = this.props;
        const found = userCategories == '' ? false : userCategories.some((el) => { return el.category === category });

        if (!(found)) { return this.props.categoryCreate({ category, topics }) }
        return this.setState({ error: true })
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

    renderTopicButton = () => {
        return (
            <CircleButton
                isDisabled={this.props.topic == ''}
                icon="plus" color={colors.darkBlue}
                onPress={this.onTopicButtonPress.bind(this)}
            />
        );
    }
    renderTopicsList = () => {
        if (!(this.props.topics == '')) {
            return (
                <ScrollView >
                    <TopicsList topics={this.props.topics} />
                </ScrollView>
            )
        }
        return (
            <View >
                <Text style={styles.instructionStyle}> You didn't add any topics yet.</Text>
                <Text style={styles.instructionStyle}> Use add button to do so.</Text>
            </View>
        );
    }

    renderError = () => {
        if (this.state.error) {
            return (
                <View style={{ height: 20 }}>
                    <Text style={styles.errorTextStyle}>This category already exists!</Text>
                </View>
            )
        }
    }

    renderTitle = () => { return (this.props.topics == '') ? 'Create topics!' : 'Your Topics' }

    render() {
        console.log('loading', this.props.loading)
        return (
          
            <Wrapper>
                <View style={styles.formSection}>
                    <View style={styles.inputSecitonRow} >
                        <Input
                            inputPropsStyle={styles.inputStyle}
                            label={false}
                            placeholder="Type name of category..."
                            onChangeText={this.onCategoryChange.bind(this)}
                            value={this.props.category}
                        />
                    </View>
                    <View style={styles.inputSecitonRow}>
                        <Input
                            inputPropsStyle={[styles.inputStyle, { marginRight: 22 }]}
                            label={false}
                            autoCapitalize="none"
                            placeholder="Type new topic..."
                            onChangeText={this.onTopicChange.bind(this)}
                            value={this.props.topic}
                        />
                        <CircleButton
                            isDisabled={this.props.topic == ''}
                            icon="plus" color={colors.pink}
                            onPress={this.onTopicButtonPress.bind(this)}
                            size={50}
                        />
                    </View>
                   
                </View>
                <View style={{ height: 30 }}>
                    {this.renderError()}
                </View>
                <View style={styles.topicsSection}>
                    <Text style={styles.instructionTitleStyle}> {this.renderTitle()} </Text>
                    {this.renderTopicsList()}
                </View>
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
    formSection: {
        flex: 8,
        alignItems: 'center',
        
        justifyContent: 'center',
    },
    topicsSection: {
        flex: 8,
    },
    buttonSection: {
        flex: 4,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },     
    inputSecitonRow: {
        width: '76%',
        height: 65,
        margin: 7,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    topicText: {
        fontSize: 17,
        paddingLeft: 20,
    },
    inputStyle: {
        height: 50,
        borderRadius: 25,

        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'white',

        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowColor: '#1a1a1a',
        shadowOpacity: 0.2,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        position: 'relative',


    },
    errorTextStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'red'
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
    instructionTitleStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.grey,
        marginBottom: 20,
        marginTop: 10,
        fontWeight: '400',
    },
    instructionStyle: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.lightGrey,
        fontWeight: '400',
        //lineHeight: 20,
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
export default connect(mapStateToProps, { categoryCreate, saveTopic, topicChanged, categoryChanged })(CreateCategory);