import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import  { connect } from 'react-redux'

class CategoriesList extends Component {

    list = () => { 
        const { customCategories, userCategories} = this.props.categories    
        return ((userCategories == '') ? customCategories : userCategories.concat(customCategories));
    }
    
    createListOfCategories = () => {
        const listToRender = [];
        this.list().forEach((object) => {
            if (!( object.category == this.props.selectedCategory)) {
                listToRender.push({ category: object.category, key: object.category, topics: object.topics });
            }
        });
        return listToRender;
    }    

    render() {
        console.log('list raw data', this.list())
        console.log('list data', this.createListOfCategories())
        return (
            <FlatList
                data={this.createListOfCategories()}
                renderItem={({ item }) => 
                    <ListItem 
                        textStyle={this.props.textStyle}
                        onItemPress={this.props.onItemPress}
                        isCategorySame = { item.category == this.props.selectedCategory } 
                        category={item.category}
                        topics={item.topics}
                        separator={true}
                    />     
                }
            />
        );
    }
};
 

const mapStateToProps = state => { return { categories: state.cat } };

export default connect(mapStateToProps, {})(CategoriesList);