import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';


class ListItem extends Component {
   
    handlePress() {
        return this.props.onItemPress(this.props.category);     
     };

    renderSeparator = () => { return this.props.separator != null ? <View style = {styles.lineStyle} /> : null }

    renderTopics = () => { 
        const { topics, topicsStyle } = this.props
        return topics != null ? <Text style={topicsStyle}>{topics.length}</Text> : null  
    }        
    render() {
        return (
            <View>
                 <TouchableOpacity 
                    style={[ styles.container, this.props.style ]}
                    onPress={() => {this.handlePress()}}
                    disabled={this.props.disabled}
                >
                    <Text style={[styles.textStyle, this.props.textStyle]}>
                        {this.props.category}
                    </Text>
                    {this.renderTopics()}
                </TouchableOpacity>
                {this.renderSeparator()}

            </View>    
        )    
    }
};

const styles = {
    container: {
        alignSelf: 'center',
        //justifyContent: 'center',
        width: '100%',
        height: 50,
    
    },
    textStyle: {
        //alignSelf: 'center',
        fontSize: 18,
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'grey',
        margin: 0,
        opacity: 0.5
    },

}
export default ListItem;