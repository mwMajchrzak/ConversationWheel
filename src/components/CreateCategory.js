import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { categoryCreate, saveTopic, topicChanged, categoryChanged } from '../actions';
import { Card, CardSection, Input, Button, Spinner, CircleButton, GoBackIcon, TopBar, Wrapper  } from './common';
import { Text, View, FlatList } from 'react-native';
import TopicsList from './TopicsList'

class CreateCategory extends Component {
    
    onBackIconPress = () => this.props.navigation.navigate('drawerStack');

    onCategoryChange(text) {
        this.props.categoryChanged(text);
    }

    onTopicChange(text) {
        this.props.topicChanged(text);

    }
    onTopicButtonPress = () => {
        this.props.saveTopic(this.props.topic);
    }



    onCategoryButtonPress() {

        if (this.props.user != null) {

            const { topics, category} = this.props;
            return this.props.categoryCreate({ category, topics });
            
        }
        return console.log( 'you can not create category')
    }




    renderCategoryButton = () => {
        return (
                <Button onPress={this.onCategoryButtonPress.bind(this)}> 
                    addCategory
                </Button>
         );
    }
    renderTopicButton() {
        return (
                <CircleButton onPress={this.onTopicButtonPress.bind(this)}> 
                </CircleButton>
         );
    }

    render() {     
        return (
             <Wrapper> 
                <TopBar> 
                    <GoBackIcon onIconPress={this.onBackIconPress}/>
                </TopBar>
                <View style={styles.inputSection}>
                 
                    <View style={styles.viewSeciton} > 
                        <Text style={styles.titleText}>Create Your Category</Text>
                        <Input 
                        label={false}
                        placeholder="Type name of category..."
                        onChangeText={this.onCategoryChange.bind(this)}
                        value={this.props.category}
                        />
                    </View>
                    
                    <CardSection style={{ marginTop: 15, borderBottomWidth: 0 }}>
                        <Text style={styles.topicText}>Your topics</Text>
                    </CardSection> 

                     <CardSection style={{ borderBottomWidth: 0, marginBottom:0, paddingBottom: 0}}>
                        <TopicsList topics={this.props.topics} />
                    </CardSection>
                    
                    <View style={styles.viewSecitonRow} > 
                       
                        <Input 
                        inputPropsStyle={{ marginTop: 15 }}
                        label={false}
                        autoCapitalize = "none"
                        placeholder="type new topic..."
                        onChangeText={this.onTopicChange.bind(this)}
                        value={this.props.topic}    
                        />
                        {this.renderTopicButton()}

                    </View>
                    

                   
                </View>
                <CardSection style={{flex: 1, borderBottomWidth: 0, padding: 20}}>
                        {this.renderCategoryButton()}
                </CardSection>    
             </Wrapper>
        )
    }
}
const styles = {
    inputSection: {
        flex: 8,
    },

    viewSeciton: {
        padding: 10,
        flex: 1,
        marginLeft: 10,
    },
    viewSecitonRow: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginLeft: 10,
        padding: 10,
        paddingTop: 0,
        flex: 3,
    },

    topicText: {
        fontSize: 17,
        paddingLeft: 20,
    },

    titleText: {
        fontSize: 25,
        padding: 5,
        marginBottom: 30
    },
}

const mapStateToProps = state =>   {
    return {
        category: state.cat.category,
        topic: state.cat.topic,
        topics: state.cat.topics,
        user: state.auth.user
    };
};
export default connect(mapStateToProps, { categoryCreate, saveTopic, topicChanged, categoryChanged })(CreateCategory);