import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';


class ListItem extends Component {

    handlePress() { return this.props.onItemPress(this.props.item.key, this.props.item.topics, this.props.item.category) }

    renderSeparator = () => { return this.props.separator != null ? <View style={styles.lineStyle} /> : null }

    renderTopics = () => {
        const { topicsStyle, item, showNumber } = this.props
        return ((item.topics != null) && showNumber) ? <Text style={topicsStyle}>{item.topics.length}</Text> : null
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    style={[styles.container, this.props.style]}
                    onPress={() => { this.handlePress() }}
                    disabled={this.props.disabled}
                >
                    <Text style={[styles.textStyle, this.props.textStyle]}>
                        {this.props.item.category}
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
        width: '100%',
        height: 50,

    },
    textStyle: {
        fontSize: 18,
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'grey',
        margin: 0,
        opacity: 0.5
    },

}
export default ListItem;