import React, { Component } from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import SelectedCategory from './SelectedCategory';
import CategoriesList from './CategoriesList';
import Icon from 'react-native-vector-icons/Feather';


class CategoryMenu extends Component {

    createButton() {
        return (
            <TouchableOpacity style={styles.containerCreateButton} >
                <Icon
                    style={styles.IconCircleStyle}
                    type="Feather"
                    name="plus-circle"
                    size={20}
                />
                <Button
                    style={styles.textStyle}
                    title="Create new category"
                    onPress={this.props.onCreateButtonPress}
                />
            </TouchableOpacity>
        );
    }

    showMenu = () => {
        if (this.props.isMenuOpen === true) {
            return (
                <View style={styles.containerCategoriesList}>
                    <View style={styles.container}>
                        <CategoriesList
                            onItemPress={this.props.onItemPress}
                            selectedCategory={this.props.selectedCategory}
                        />
                    </View>
                    {this.createButton()}
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.containerCategoryMenu} >
                <SelectedCategory
                    isMenuOpen={this.props.isMenuOpen}
                    onPress={this.props.toggleMenu}
                    selectedValue={this.props.selectedCategory}
                />
                {this.showMenu()}
            </View>
        )
    }
}
const styles = {
    containerCategoryMenu: {
        width: '75%',
        position: 'absolute',
        top: '30%',
        alignSelf: 'center',
        alignItems: 'space-around',
        justifyContent: 'center',
        zIndex: 60,
    },
    containerCategoriesList: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    container: {
        alignSelf: 'center',
        width: '100%',
        padding: 0,
        margin: 0,
        maxHeight: 210
    },
    containerCreateButton: {
        margin: 0,
        padding: 0,
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 50,
    },
    textStyle: {
        alignSelf: '',
        fontSize: 17
    },
    IconCircleStyle: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        left: 15,
        opacity: 0.7
    },

}
export default CategoryMenu;
