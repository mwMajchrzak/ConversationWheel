import React, { Component } from 'react';
import { MenuIcon, Wrapper, TopBar, CircleButton, Messeage}  from './common';
import UserCategoriesList from './UserCategoriesList';
import { Text, View } from 'react-native'
import  { connect } from 'react-redux'
import { categoryDelete, fetchCategories } from '../actions';



class ManageCategories extends Component {
    
    componentWillReceiveProps(nextProps) {
       if(nextProps.user != this.props.user) { return( this.props.fetchCategories()) }
    }

    state = {
        isButtonClicked: false,
        clickedCategory:'',
        showModal: this.props.user == null
        
    }

    onAccept = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('LogInForm');

    }
    onDecline = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('Game');
        
    }
   

    onIconPress = () => this.props.navigation.openDrawer();

    buttonNotClicked = () => this.setState({ clickedCategory: '', isButtonClicked: false  }); 
     
    buttonClicked = (category) => this.setState({ clickedCategory: category, isButtonClicked: true }); 

    onCreateButtonPress = () => this.props.navigation.navigate('createCategory');

    onDeleteButtonPress = () => {
        const { clickedCategory } = this.state;
        this.props.categoryDelete({ clickedCategory });
        this.buttonNotClicked()
    }

    renderButtons = () => {
        if(this.state.isButtonClicked) {
            return ( 
                <View style={styles.buttonsSection}> 
                    <CircleButton onPress={this.buttonNotClicked} icon="x" color="#999999"/>    
                    <CircleButton onPress={this.onDeleteButtonPress} icon="trash-2" color="#999999"/>
                    <CircleButton icon="edit" color="#999999"/>
                </View>
            )    
        }
        return <CircleButton onPress={this.onCreateButtonPress} icon="plus" color="#6699ff"/>
    
    }
    renderList = () => {
        if (!(this.props.userCategories == '')) {
            return (
                <UserCategoriesList 
                clickedCategory={this.state.clickedCategory} 
                onItemPress={this.buttonClicked} 
                textStyle={styles.textStyleList}/>
            )
        }    
        return (
            <Text> Press button to create your first category...</Text>
        );    
    }

    render () {
        console.log('state manage', this.state.clickedCategory)

        return (
        <Wrapper> 
            <TopBar> 
                <MenuIcon onIconPress={this.onIconPress}/>
            </TopBar>
            <View style={styles.headerSection}>
                    <Text style={styles.header}>Your Categories</Text>
                </View>  
            {this.renderList()}
         
            <View style={{alignSelf: 'center'}}>
                 {this.renderButtons()}
            </View>
            <Messeage 
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
               >
                   You need to be logged in
            </Messeage> 

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
    customCategories: state.cat.customCategories,
    user: state.auth.user
} };

export default connect(mapStateToProps, { categoryDelete, fetchCategories })(ManageCategories);