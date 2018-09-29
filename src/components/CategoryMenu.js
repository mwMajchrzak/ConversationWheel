import React, { Component, componentWillMount } from 'react';
import {  Text,  View, TouchableOpacity, Button, Navigator, TouchableWithoutFeedback } from 'react-native';
import SelectedCategory from './SelectedCategory';
import CategoriesList from './CategoriesList';
import Icon from 'react-native-vector-icons/Feather';


class CategoryMenu extends Component {

  

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
        top: '40%',
        alignSelf: 'center',
        alignItems: 'space-around',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        zIndex: 60,
        
    },
    containerCategoriesList: {
        alignSelf: 'center',
        width: '100%',
        padding: 0,
        margin: 0,
     
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
