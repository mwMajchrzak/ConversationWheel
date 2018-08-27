import React, { Component, componentDidUpdate } from 'react';
import { connect } from 'react-redux'
import { categoryCreate, saveTopic, topicChanged, categoryChanged } from '../actions';
import { CardSection, Input, Button, Spinner, CircleButton, GoBackIcon, TopBar, Wrapper, Messeage } from './common';
import { Text, View, FlatList } from 'react-native';
import TopicsList from './TopicsList'

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
                addCategory
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
                icon="plus" color="#6699ff"
                onPress={this.onTopicButtonPress.bind(this)}
            />
        );
    }
    renderTopicsList = () => {
        if (!(this.props.topics == '')) {
            return (
                <View style={{ flex: 2 }}>
                <Text style={styles.topicText}>Your topics</Text>
                <TopicsList topics={this.props.topics} />
                </View>
            )
        }
        return (
            <View style={{ flex: 2 }}>
                <Text style={styles.instructionTitleStyle}> Create category!</Text>
                <Text style={styles.instructionStyle}> You didn't create any categories yet.</Text>
                <Text style={styles.instructionStyle}> Press add button to create the first one.</Text>
            </View>
        );
    }

    renderError = () => {
        if (this.state.error) {
            return (
                <View style={{ height: 50 }}>
                    <Text style={styles.errorTextStyle}>Category already exist, choose another name</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <Wrapper>
                <View style={styles.formSection}>
                    {this.renderError()}
                    <View style={styles.inputSecitonRow} >

                        <Input
                            inputPropsStyle={styles.inputStyle}
                            label={false}
                            placeholder="   Type name of category..."
                            onChangeText={this.onCategoryChange.bind(this)}
                            value={this.props.category}
                        />

                    </View>
                    <View style={styles.inputSecitonRow}>

                        <Input
                            inputPropsStyle={[styles.inputStyle, { marginRight: 30 }]}
                            label={false}
                            autoCapitalize="none"
                            placeholder="   type new topic..."
                            onChangeText={this.onTopicChange.bind(this)}
                            value={this.props.topic}
                        />
                        {this.renderTopicButton()}

                    </View>
                </View>
            
                {this.renderTopicsList()}

        
                <View style={{ flex: 1 }}>
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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputSecitonRow: {
        width: '80%',
        height: 65,
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

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
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        position: 'relative',

        
    },
    errorTextStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'red'
    },
    categoryButton: {
        width: '50%', 
        height: 60, 
        marginBottom: 30,
        flex: 0, 
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#0073e6',
    },
    buttonTextStyle: {
        color: 'white'
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
        category: state.cat.category,
        topic: state.cat.topic,
        topics: state.cat.topics,
        user: state.auth.user,
        userCategories: state.cat.userCategories
    };
};
export default connect(mapStateToProps, { categoryCreate, saveTopic, topicChanged, categoryChanged })(CreateCategory);