 
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
            <FlatList horizontal={true} alwaysBounceHorizontal={false} style={styles.listStyle}
                data={this.createListOfTopics()}
                renderItem={({ item }) => 
                    <Text style={styles.textStyle}>{ item.topic} </Text>   
                }
            />
        );
    }
};
 
const styles= {
    listStyle: {
       // width: '100%',
        padding: 5,
        margin: 5,
        flexDirection: 'row',
       flex: 1
    },
    textStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 5,
        padding: 15,
        backgroundColor: '#ff9999',
        borderRadious: 2,
        borderColor: 'black',
        //flex: 1,
        color: 'white',
        fontSize: 20
    }
}