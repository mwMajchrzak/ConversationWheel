import React, {  Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { logoutUser } from '../../actions';
import colors from '../../styles/colors'

import { UserIcon } from './index';

class UserButtonComponent extends Component {

    handlePress = () => {
        this.setState({ showWindow: false })
        this.props.UserPress()
    }

    state = { showWindow: false }

    renderHeader = () => {
        if (this.props.user != null) {
            return (
                <View>

                    <View style={styles.iconSection}>
                        <UserIcon onIconPress={() => { this.setState({ showWindow: true }) }} />
                    </View>
                    <Modal
                        visible={this.state.showWindow}
                        transparent
                        animatonType="slide"
                    >
                        <TouchableOpacity style={styles.screenStyle} onPress={() => { this.setState({ showWindow: false }) }}>
                            <View style={styles.containerWindowStyle}>
                                <View style={styles.windowSectionStyle}>
                                    <Text style={styles.windowTextStyle}> {this.props.user.user.email}</Text>
                                </View>
                                <TouchableOpacity onPress={this.handlePress} style={styles.windowSectionStyle}>
                                    <Text style={styles.windowTextStyle}>
                                        LOG OUT
                                    </Text>
                                </TouchableOpacity>
                             
                            </View>
                        </TouchableOpacity >
                    </Modal>

                </View>
            )
        }
        return (
            <TouchableOpacity onPress={this.props.LogInPress} style={styles.buttonStyle}>
                <Text style={styles.textStyle}>LOG IN</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                {this.renderHeader()}
            </View>

        )
    }
};

const styles = {

    screenStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    containerWindowStyle: {
        position: 'absolute',
        top: 120,
        right: 10,
        width: 120,
        height: 100,
        backgroundColor: colors.pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconSection: {
        paddingRight: 20,
        marginBottom: 15
    },

    buttonStyle: {
        backgroundColor: colors.white,
        width: 52,
        height: 27,
        marginRight: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },

    textStyle: {
        color: colors.blue,
        fontWeight: '600',
        fontSize: 10,

    },
    windowTextStyle: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 12,

    },
    windowSectionStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
    },

}

const mapStateToProps = state => { return { user: state.auth.user } };

export default connect(mapStateToProps, { logoutUser })(UserButtonComponent);