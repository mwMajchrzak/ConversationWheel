import React, { Component } from 'react';
import { Text, View, FlatList, List, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';


export default class CategoriesList extends Component {
    
  

    render() {

    console.log('selectedCategory in Category list', this.props.selectedCategory);    

            
        return (
           // <View>   
                <FlatList style={styles.flatList }
                    data={this.props.categories}
                    renderItem={({ item }) => 
                        <ListItem 
                            updateCategory={this.props.updateCategory} 
                            category={item.category}
                            selectedCategory={this.props.selectedCategory}
                        />
                       
                    }    
                                           
                />
                
            //</View>  
        );
    }
};
 
const styles= {
    flatList: {
        alignSelf: 'center',
        width: '100%',
        //backgroundColor: 'green',
        padding: 0,
        margin: 0
    }
}