import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import  { connect } from 'react-redux'

class CategoriesList extends Component {
    
    createListOfCategories = () => {

        const { userCategories, customCategories } = this.props.categories
        list = () => { 
            return ((userCategories == '') ? customCategories : userCategories.concat(customCategories));
        }
        return list().map((object) => {
            return ({ category: object.category, key: object.category });
        });
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

const mapStateToProps = state => { return { categories: state.cat } };

export default connect(mapStateToProps, {})(CategoriesList);