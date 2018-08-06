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

        const listToRender = [];

        list().forEach((object) => {

            if (!( object.category == this.props.selectedCategory)) {

            listToRender.push({ category: object.category, key: object.category });

            }
        });
        return listToRender;
    }


    render() {
        
        return (
            <FlatList
                data={this.createListOfCategories()}
                renderItem={({ item }) => 
                    <ListItem 
                        textStyle={this.props.textStyle}
                        onItemPress={this.props.onItemPress}
                        isCategorySame = { item.category == this.props.selectedCategory } 
                        category={item.category}
                    />     
                }
            />
        );
    }
};
 

const mapStateToProps = state => { return { categories: state.cat } };

export default connect(mapStateToProps, {})(CategoriesList);