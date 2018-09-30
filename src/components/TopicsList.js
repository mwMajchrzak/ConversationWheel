
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import colors from '../styles/colors'
import { connect } from 'react-redux'

class CategoriesList extends Component {

    handlePress = (topic) => {
        console.log('pressed', topic)
    }

    renderItem = () => {
        const topicsList = Array.from(this.props.topics).map((object) => {
            return ({ topic: object, key: object });
        });
        return topicsList.map((data) => {
            if (this.props.deleteMode) {
                return (
                    <TouchableOpacity onPress={this.handlePress} style={styles.listStyle} >
                        <Text style={styles.textStyle}>{data.topic}</Text>
                    </TouchableOpacity>
                )
            }
            return (
                <View style={styles.listStyle} >
                    <Text style={styles.textStyle}>{data.topic}</Text>
                </View>
            )

        })
    }

    render() {
        return (
            <View>
                { this.renderItem() }
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
const mapStateToProps = state => { return { deleteMode: state.cat.deleteMode } };

export default connect(mapStateToProps, {})(CategoriesList);
