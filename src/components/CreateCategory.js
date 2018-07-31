import React, { Component, componentDidUpdate } from 'react';
import  { connect } from 'react-redux'
import { saveTopic, topicChanged, categoryChanged } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Text, View, FlatList } from 'react-native';
import TopicsList from './TopicsList'
import { GoBackIcon, TopBar, Wrapper } from './common'; 

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
        // const { email, password } = this.props;
        // this.props.loginUser({ email, password });
        console.log('button was pressed');
    }

    // renderError() {
        
    //     if (this.props.error) {
    //         return (
    //             <View style={{ backgroundColor: 'white' }}>
    //                 <Text style={ styles.errorTextStyle }> 
    //                     {this.props.error}
    //                 </Text>
    //             </View>    
    //         );
    //     }
    // }
    renderCategoryButton = () => {
        return (
                <Button onPress={this.onCategoryButtonPress.bind(this)}> 
                    addCategory
                </Button>
         );
    }
    renderTopicButton() {
        return (
                <Button onPress={this.onTopicButtonPress.bind(this)}> 
                    add topic
                </Button>
         );
    }
    // createListOfTopics = () => {
    //     //console.log(this.props.topics)
    //     const topicsList = [];
    //     const topicsList = this.props.topics.map((object) => {
    //         return ({ topic: object, key: object });
    //     });  
    //     return (topicsList);      
    // }


   

    // renderTopics = ()  => {
    //     const topics= this.props.topics
    //     return (
    //     <View>    
    //     {topics.map((topic, index) => (
    //         <Text>{topic} </Text>
    //     ))};
    //     </View>
    //         // <FlatList
    //         //     data={this.createListOfTopics()}
    //         //     renderItem={({ item }) => 
    //         //         <Text> {item.topic} </Text>
    //         //         //     updateCategory={this.props.updateCategory} 
    //         //         //     category={item.category}
    //         //         //     selectedCategory={this.props.selectedCategory}
    //         //         // />     
    //         //     }
    //         // />
    //         // topicsList.map( function(topic) {
    //         //     return (
    //         //         <Text style={{ margin: 5 }}>{topic}</Text>
    //         //     );
    //         // });
    //     );
    // }


    render() {     
        return (
             <Wrapper> 
                <TopBar> 
                    <GoBackIcon onIconPress={this.onBackIconPress}/>
                </TopBar>
                <View style={styles.inputSection}>
                 
                    <View style={styles.viewSeciton} > 
                        <Text style={styles.instructionText}>Name category</Text>
                        
                        <Input 
                        
                        placeholder="Food"
                        onChangeText={this.onCategoryChange.bind(this)}
                        value={this.props.category}
                        />
                    </View>
                    <View style={styles.viewSeciton} > 
                            <Text style={styles.instructionText}>Your topic</Text>
                    
                        <Input 
                        placeholder="topic"
                        onChangeText={this.onTopicChange.bind(this)}
                        value={this.props.topic}    
                        />
                    </View>
                
                <CardSection style={{flex: 1, borderBottomWidth: 0}}>
                {this.renderTopicButton()}
                </CardSection>
                <CardSection style={{flex: 4, borderBottomWidth: 0}}>
                <TopicsList topics={this.props.topics} />
                </CardSection>
                <CardSection style={{flex: 1, borderBottomWidth: 0}}>
                {this.renderCategoryButton()}
                </CardSection>
            </View>    
             </Wrapper>
        )
    }
}
const styles = {
    inputSection: {
        flex: 8,
    },

    viewSeciton: {
        padding: 15,
        flex: 2,
    },

    instructionText: {
        fontSize: 15,
        padding: 5
    },
}

const mapStateToProps = state =>   {
    return {
        category: state.cat.category,
        topic: state.cat.topic,
        topics: state.cat.topics
    };
};
export default connect(mapStateToProps, { saveTopic, topicChanged, categoryChanged })(CreateCategory);