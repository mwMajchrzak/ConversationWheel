import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';
import { turnOffDeleteMode, turnOnDeleteMode } from '../../actions';


class EditDone extends Component {
    
    render() {
        if (this.props.deleteMode) {
            return (
                <TouchableOpacity onPress={this.props.turnOffDeleteMode}>
                    <Text> Done</Text>
                </TouchableOpacity>
            )
        }
        return (
            <Icon
                type="Ionicons"
                name="trash-2"
                size={30}
                onPress={this.props.turnOnDeleteMode}
                color='white'

            />
        )
    }
};
const mapStateToProps = state => { return { deleteMode: state.cat.deleteMode } };

export default connect(mapStateToProps, { turnOnDeleteMode, turnOffDeleteMode })(EditDone);
