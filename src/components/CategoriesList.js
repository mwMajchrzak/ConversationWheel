import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import  { connect } from 'react-redux'

class CategoriesList extends Component {

    list = () => { 
        const listToRender = [];
        const { customCategories, userCategories} = this.props.categories    
        const list = userCategories == '' ? customCategories : userCategories.concat(customCategories);
        list.forEach((obj) => { obj.category == this.props.selectedCategory ? null : listToRender.push(obj) })
        return listToRender
    }

    render() {
        return (
            <FlatList
                data={this.list()}
                renderItem={({ item }) => 
                    <ListItem 
                        textStyle={this.props.textStyle}
                        onItemPress={this.props.onItemPress}
                        isCategorySame = { item.category == this.props.selectedCategory } 
                        item={item}
                        separator={true}
                    />     
                }
            />
        );
    }
};
 

const mapStateToProps = state => { return { categories: state.cat } };

export default connect(mapStateToProps, {})(CategoriesList);