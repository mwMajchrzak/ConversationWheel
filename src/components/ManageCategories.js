import React, { Component } from 'react';
import { MenuIcon, Wrapper, TopBar, CircleButton}  from './common';
import CategoriesList from './CategoriesList';
import { Text, View } from 'react-native'
import  { connect } from 'react-redux'
import { categoryDelete } from '../actions';



class ManageCategories extends Component {
    state = {
        isButtonClicked: false,
        clickedCategory:''
    }

    onIconPress = () => this.props.navigation.openDrawer();

    buttonNotClicked = () => this.setState({ clickedCategory: '', isButtonClicked: false  }); 
     
    buttonClicked = (category) => this.setState({ clickedCategory: category, isButtonClicked: true }); 


    renderButtons = () => {
        if(this.state.isButtonClicked) {
            return ( 
                <View style={styles.buttonsSection}> 
                    <CircleButton onPress={this.buttonNotClicked} icon="x" color="#999999"/>    
                    <CircleButton onPress={this.props.categoryDelete} icon="trash-2" color="#999999"/>
                    <CircleButton icon="edit" color="#999999"/>
                </View>
            )    
        }
        return <CircleButton icon="plus" color="#6699ff"/>
    
    }

    render () {
        return (
        <Wrapper> 
            <TopBar> 
                <MenuIcon onIconPress={this.onIconPress}/>
            </TopBar>
            <View style={styles.headerSection}>
                    <Text style={styles.header}>Your Categories</Text>
                </View>  
            <CategoriesList 
                clickedCategory={this.state.clickedCategory} 
                onItemPress={this.buttonClicked} 
                textStyle={styles.textStyleList}/>
            <View style={{alignSelf: 'center'}}>
                 {this.renderButtons()}
            </View>

        </Wrapper>
        )
    }
}
const styles = { 
    headerSection: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    header: {
        fontSize: 20,
        marginBottom: 10
    },
   
    textStyleList: {
       alignSelf: 'flex-start',
       paddingLeft: 20
    },
   
    buttonsSection: {
        justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'row'
    }
}
const mapStateToProps = state => { return { 
    userCategories: state.cat.userCategories,
    customCategories: state.cat.customCategories 
} };

export default connect(mapStateToProps, { categoryDelete })(ManageCategories);