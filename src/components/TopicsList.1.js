 
 import React, { Component } from 'react';
import { FlatList, Text, ListView } from 'react-native';

export default class CategoriesList extends Component {

    // constructor() {
    //     super();
    //     const topicsList = Array.from(this.props.topics).map((object) => { return  ({ topic: object, key: object })  });  
    //     const ds = new ListView.topicsList({rowHasChanged: (r1, r2) => r1 !== r2});
    //     this.state = {
    //       dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    //     };
    //   }
    
    // createListOfTopics = () => {
    //    const topicsList = Array.from(this.props.topics).map((object) => {
    //         return ({ topic: object, key: object });
    //     });  
    //     return topicsList;      
    // }

    render() {
        return (
            <FlatList removeClippedSubviews={false} scrollEnabled={false}  horizontal={true} alwaysBounceHorizontal={false} style={styles.listStyle}
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
        borderColor: 'black',
        //flex: 1,
        color: 'white',
        fontSize: 20
    }
}