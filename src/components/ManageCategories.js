import React, { Component } from 'react';
import { MenuIcon, Wrapper, TopBar, CircleButton}  from './common';
import CategoriesList from './CategoriesList';
import { Text, View } from 'react-native'
import  { connect } from 'react-redux'


class ManageCategories extends Component {

    onIconPress = () => this.props.navigation.openDrawer();

    render () {
        return (
        <Wrapper> 
            <TopBar> 
                <MenuIcon onIconPress={this.onIconPress}/>
                  
            </TopBar>
            <View style={styles.headerSection}>
                    <Text style={styles.header}>Your Categories</Text>
                </View>  
            <CategoriesList />
            <View style={{alignSelf: 'center'}}>
                 <CircleButton />
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
    }
}
const mapStateToProps = state => { return { 
    userCategories: state.cat.userCategories,
    customCategories: state.cat.customCategories 
} };

export default connect(mapStateToProps, {})(ManageCategories);