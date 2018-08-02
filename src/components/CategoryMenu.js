import React, { Component, componentWillMount } from 'react';
import {  Text,  View, TouchableOpacity, Button, Navigator } from 'react-native';
import SelectedCategory from './SelectedCategory';
import CategoriesList from './CategoriesList';
import Icon from 'react-native-vector-icons/Feather';


class CategoryMenu extends Component {

    state = {
        category: 'Select Category', 
    }

    updateCategory = (category) => {
       this.setState({ category: category })
       this.props.toggleMenu();
    };

    onButtonPress = () => {
        console.log('tuuuuuu', this.props)
        // const { navigate } = this.props.navigation;
        // return navigate('LogInForm')
    } 

    createButton() {
        return (
            <TouchableOpacity  style={styles.containerCreateButton} >
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
        if (this.props.isMenuOpen === true ) {
            return (
                <View style={styles.containerCategoriesList}>
                    <CategoriesList 
                        updateCategory={this.updateCategory} 
                        selectedCategory={this.state.category}
                    />
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
                        selectedValue={this.state.category}
                    />
                    {this.showMenu()}
            </View>
        )
    }
}
const styles = {
    containerCategoryMenu: {
        width: '70%',
        position: 'absolute',
        top: '35%',
        alignSelf: 'center',
        alignItems: 'space-around',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        zIndex: 60
        
        
    },
    containerCategoriesList: {
        alignSelf: 'center',
        width: '100%',
        padding: 0,
        margin: 0
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
        alignSelf: 'center',
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