import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';


class ListItem extends Component {
   
    handlePress() {
        return this.props.onItemPress(this.props.category);     
     };

     renderSeparator() {
        return <View style = {styles.lineStyle} />
    };

    asignStyle = () => { 
        const { category, clickedCategory } = this.props
        return category == clickedCategory ? {backgroundColor: '#cccccc'} : null 
    }

    render() {

        const isCategorySame = this.props.category == this.props.selectedCategory;
        const isCategoryClicked = this.props.category == this.props.clickedCategory;
     
        if (!(isCategorySame)) {
            return (
                <View >
                     <TouchableOpacity 
                        style={[styles.container, this.asignStyle() ]}
                        onPress={() => {this.handlePress()}}
                        disabled={isCategoryClicked}
                    >
                        <Text style={[styles.textStyle, this.props.textStyle]}>
                            {this.props.category}

                        </Text>
                      
                    </TouchableOpacity>
                    {this.renderSeparator()}
                    
                </View>    
            )
        }

        return null;
    }
};
const styles = {
    container: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
    
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 17,
    },
    lineStyle:{
        margin: 0,
        padding: 0,
        borderWidth: 0.5,
        borderColor:'grey',
        margin: 0,
        opacity: 0.5
    }
}
export default ListItem;