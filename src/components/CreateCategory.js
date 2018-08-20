import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { categoryCreate, saveTopic, topicChanged, categoryChanged } from '../actions';
import { CardSection, Input, Button, Spinner, CircleButton, GoBackIcon, TopBar, Wrapper, Messeage  } from './common';
import { Text, View, FlatList } from 'react-native';
import TopicsList from './TopicsList'

class CreateCategory extends Component {
 
    state = {
        showModal: this.props.user == null,
        error: false
    }

    onBackIconPress = () => this.props.navigation.navigate('drawerStack');

    onCategoryChange(text) {
        this.props.categoryChanged(text);
        this.setState({ error: false })
    }

    onTopicChange(text) {
        this.props.topicChanged(text);

    }
    onTopicButtonPress = () => {
        
        this.props.saveTopic(this.props.topic);
    }


    onCategoryButtonPress() {
        const { topics, category, userCategories} = this.props;

        const  found = userCategories.some(function (el) {
                return el.category === category;
        });

        if( !(found) ) {
            return this.props.categoryCreate({ category, topics });
        }
       return this.setState({ error: true })   
    }

    renderCategoryButton = () => {
        const { topics, category } = this.props
        return (
            <Button isDisabled={(topics == '') || (category == '')} onPress={this.onCategoryButtonPress.bind(this)}> 
                addCategory
            </Button>
         );
    }
    onAccept = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('LogInForm', {updateData: this.updateData});
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

    renderError = () => {
        if(this.state.error) {
            return (
                <Text style={styles.errorTextStyle}>Category already exist, choose another name</Text>
            )
        }
    }

    render() {     
        return (
             <Wrapper> 
                <TopBar> 
                    <GoBackIcon onIconPress={this.onBackIconPress}/>
                </TopBar>
                <View style={styles.formSection}>
                    <Text style={styles.titleText}>Create Your Category</Text>
                    <View style={styles.inputSeciton} > 
                        
                        <Input 
                        inputPropsStyle={styles.inputStyle}
                        label={false}
                        placeholder="   Type name of category..."
                        onChangeText={this.onCategoryChange.bind(this)}
                        value={this.props.category}
                        />

                    </View>
                    <CardSection style={{ borderBottomWidth: 0, flex: 1}}> 

                        {this.renderError()}

                    </CardSection>
                    <View style={styles.inputSecitonRow}> 

                        <Input 
                        inputPropsStyle={[styles.inputStyle, { marginRight: 20}]}
                        label={false}
                        autoCapitalize = "none"
                        placeholder="   type new topic..."
                        onChangeText={this.onTopicChange.bind(this)}
                        value={this.props.topic}    
                        />

                        {this.renderTopicButton()}

                    </View>
                    <CardSection style={{ borderBottomWidth: 0, marginBottom:0, paddingBottom: 0, flex: 5}}>

                        <Text style={styles.topicText}>Your topics</Text>
                        <TopicsList topics={this.props.topics} />

                    </CardSection>
                </View>
                <CardSection style={{flex: 1, borderBottomWidth: 0, padding: 20}}>
                        {this.renderCategoryButton()}
                </CardSection>
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
        //backgroundColor: 'yellow'
    },

    inputSeciton: {

        margin: 15,
       // backgroundColor: 'blue',
        height: 65,
    },
    inputSecitonRow: {
    
        flexDirection: 'row',
        justifyContent: 'center'
,        margin: 15,
        height: 65,
   //  backgroundColor: 'blue',


    },

    topicText: {
        fontSize: 17,
        paddingLeft: 20,
    },

    titleText: {
        fontSize: 25,
        margin: 15
    },
    inputStyle: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: 'grey',
        width: '90%',
        flex: 1
    },
    errorTextStyle: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'red'
    },
}

const mapStateToProps = state =>   {
    return {
        category: state.cat.category,
        topic: state.cat.topic,
        topics: state.cat.topics,
        user: state.auth.user,
        userCategories: state.cat.userCategories
    };
};
export default connect(mapStateToProps, { categoryCreate, saveTopic, topicChanged, categoryChanged })(CreateCategory);