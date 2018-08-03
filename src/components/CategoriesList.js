import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import  { connect } from 'react-redux'

class CategoriesList extends Component {
    
    createListOfCategories = () => {

        const { customCategories, userCategories} = this.props.categories
        list = () => { 
            return ((userCategories == '') ? customCategories : userCategories.concat(customCategories));
        }
        return list().map((object) => {
            return ({ category: object.category, key: object.category });
        });
    }

    render() {
     
        return (
            <FlatList
                data={this.createListOfCategories()}
                renderItem={({ item }) => 
                    <ListItem 
                        textStyle={this.props.textStyle}
                        onItemPress={this.props.onItemPress} 
                        category={item.category}
                        selectedCategory={this.props.selectedCategory}
                        clickedCategory={this.props.clickedCategory}
                    />     
                }
            />
        );
    }
};
 

const mapStateToProps = state => { return { categories: state.cat } };

export default connect(mapStateToProps, {})(CategoriesList);