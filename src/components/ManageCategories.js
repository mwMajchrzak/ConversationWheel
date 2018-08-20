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

    onMenuIconPress = () => this.props.navigation.openDrawer();

    onAccept = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('LogInForm', {updateData: this.updateData});
    }
    onDecline = () => {
        this.setState({ showModal: false });
        this.props.navigation.navigate('Game');
        
    }
    updateData  = data => {
        console.log(data);
        this.setState(data)
      
    };

 


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
                    <CircleButton onPress={this.buttonNotClicked} icon="chevron-left" color="#999999"/>    
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

        return (
        <Wrapper style={styles.wrapperStyle}> 
            <TopBar> 
                <MenuIcon  onIconPress={this.onMenuIconPress}/>
            </TopBar>
            <View style={styles.headerSection}>
                    <Text style={styles.header}>Your Categories</Text>
            </View>  
            <View  style={styles.listSection}>
            {this.renderList()}
            </View>
            <View style={{alignSelf: 'center', flex: 2, width: '50%', maxWidth: 200}}>
                 {this.renderButtons()}
            </View>
            <Messeage 
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
            />

        </Wrapper>
        )
    }
}
const styles = { 
    headerSection: {
        alignSelf: 'center',
        flexDirection: 'row',
        flex: 1,
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
        justifyContent: 'space-between',
       flexDirection: 'row',
    },
    wrapperStyle: {
        backgroundColor: '#f2f2f2',
    },
    listSection: {
        flex: 10,
    }
}
const mapStateToProps = state => { return { 
    userCategories: state.cat.userCategories,
    customCategories: state.cat.customCategories,
    user: state.auth.user
} };

export default connect(mapStateToProps, { categoryDelete, fetchCategories })(ManageCategories);