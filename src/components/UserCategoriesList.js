import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import  { connect } from 'react-redux'

class UserCategoriesList extends Component {
    
    createListOfCategories = () => {
        return this.props.userCategories.map((object) => {
            return ({ category: object.category, key: object.category });
        });
    }

    asignStyle = (category) => { return (category == this.props.clickedCategory) ? {backgroundColor: '#cccccc'} : null }   

    isDisabled = (category) => { return category == this.props.clickedCategory }

    render() {
    
        return (
            <FlatList
                data={this.createListOfCategories()}
                renderItem={({ item }) => 
                    <ListItem 
                        textStyle={this.props.textStyle}
                        style={this.asignStyle(item.category)}
                        onItemPress={this.props.onItemPress}
                        category={item.category}
                        disabled={this.isDisabled(item.category)}
                    />     
                }
            />
        );
    }
};
 

const mapStateToProps = state => { return { userCategories: state.cat.userCategories } };

export default connect(mapStateToProps, {})(UserCategoriesList);