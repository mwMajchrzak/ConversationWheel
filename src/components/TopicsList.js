
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import colors from '../styles/colors'

export default class CategoriesList extends Component {

    renderItem = () => {
        const topicsList = Array.from(this.props.topics).map((object) => {
            return ({ topic: object, key: object });
        });
        return topicsList.map((data) => { return <Text style={styles.textStyle}>{data.topic}</Text> })
    }

    render() {
        return (
            <View style={styles.listStyle} >
                {this.renderItem()}
            </View>
        );
    }
};

const styles = {
    listStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
    },
    textStyle: {
        textAlign: 'center',
        margin: 5,
        padding: 15,
        lineHeight: 25,
        backgroundColor: colors.blue,
        color: colors.white,
        fontSize: 16,
        textTransform: 'uppercase'
    }
}