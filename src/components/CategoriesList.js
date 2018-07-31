import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';

export default class CategoriesList extends Component {
    
    createListOfCategories = () => {
        const categoriesList = this.props.categoriesObject.map((object) => {
            return ({ category: object.category, key: object.category })
        });  
        return categoriesList;      
    }

    render() {
        return (
            <FlatList style={styles.flatList }
                data={this.createListOfCategories()}
                renderItem={({ item }) => 
                    <ListItem 
                        updateCategory={this.props.updateCategory} 
                        category={item.category}
                        selectedCategory={this.props.selectedCategory}
                    />     
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