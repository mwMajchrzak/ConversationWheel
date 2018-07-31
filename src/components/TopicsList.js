 
 import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

export default class CategoriesList extends Component {
    
    createListOfTopics = () => {
       const topicsList = Array.from(this.props.topics).map((object) => {
            return ({ topic: object, key: object });
        });  
        return topicsList;      
    }

    render() {
        return (
            <FlatList style={styles.flatList }
                data={this.createListOfTopics()}
                renderItem={({ item }) => 
                    <Text>{ item.topic} </Text>   
                }
            />
        );
    }
};
 
const styles= {
    flatList: {
        alignSelf: 'center',
        width: '100%',
        padding: 0,
        margin: 0
    }
}