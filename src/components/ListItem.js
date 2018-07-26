import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


class ListItem extends Component {
    handlePress() {
        return this.props.updateCategory(this.props.category);     
     };

     renderSeparator() {
        console.log('czesc')
        return <View style = {styles.lineStyle} />
    };
    render() {
        console.log(this.props.selectedCategory)
        const isCategorySame = this.props.category != this.props.selectedCategory;
     
        if (isCategorySame) {
            return (
                <View style={styles.container}>
                    <Button 
                        title={this.props.category} 
                        onPress={() => {this.handlePress()}} 
                        style={styles.textStyle}
                    />
                    {this.renderSeparator()}
                </View>    
            )
        }

        return null;
    }
};
const styles = {

    container: {
    margin: 0,
    padding: 0,    
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    },
    textStyle: {
        fontSize: 20,
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