import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ListItem';
import  { connect } from 'react-redux'
import colors from '../styles/colors';

class UserCategoriesList extends Component {
    
    createListOfCategories = () => {
        return this.props.userCategories.map((object) => {
            return ({ category: object.category, key: object.category, topics: object.topics});
        });
    }

    asignStyle = (category) => { return (category == this.props.clickedCategory) ? stylesChildren.clickedButtonStyle : null }   

    isDisabled = (category) => { return category == this.props.clickedCategory }

    render() {
  
        return (
            <FlatList
                data={this.createListOfCategories()}
                renderItem={({ item }) => 
                    <ListItem 
                        textStyle={this.props.textStyle}
                        style={[stylesChildren.buttonStyle, this.asignStyle(item.category)]}
                        onItemPress={this.props.onItemPress}
                        textStyle={stylesChildren.textStyle}
                        topicsStyle={stylesChildren.topicsStyle}
                        topics={item.topics}
                        category={item.category}
                        disabled={this.isDisabled(item.category)}
                    />     
                }
            />
        );
    }
};
 
const stylesChildren = {
    topicsStyle: {
        fontSize: 14,
        color: '#9999',
        fontWeight: '400', 
        marginRight: 25,
        padding: 0,
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        height: 50,
        borderRadius: 25,
        marginTop: 12,


        // shadowOffset:{  width: 0,  height: 0 },
        // shadowRadius: 10,
        // shadowColor: '#1a1a1a',
        // shadowOpacity: 0.2,

        shadowOffset:{ width: 2,  height: 2 },
        shadowColor: '#1a1a1a',
        shadowOpacity: 0.2,

        shadowRadius: 8,


        backgroundColor: '#fbfbfb',
        width: '85%',
    },
    clickedButtonStyle: {
       borderWidth: 0.5,
       borderColor: '#f2f2f2',
       backgroundColor: colors.white,
       shadowOpacity: 0.5,
       height: 53,
       width: '85%',
       
    },
    textStyle: {
        fontSize: 18,
        color: '#666666',
        fontWeight: '400',
        marginLeft: 25,
        padding: 0,
    }
}

const mapStateToProps = state => { return { userCategories: state.cat.userCategories } };

export default connect(mapStateToProps, {})(UserCategoriesList);