import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, DrawerNavigator, drawerIcon, goBack } from 'react-navigation';
import Game from './components/Game';
import ManageCategories from './components/ManageCategories';
import Friends from './components/Friends';
import Settings from './components/Settings';
import CreateCategory from './components/CreateCategory';
import LoginForm from './components/LoginForm';
import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/Feather';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import { Provider } from 'react-redux';

const DrawerStack = DrawerNavigator({
    Game: { 
        screen: Game,
        navigationOptions: {
            title: 'Spinn The Wheel',
            drawerIcon: () => (
                <Icon  
                type="Ionicons" name="ios-aperture-outline"  
                size={25}
                onPress={() => closeDrawer()}/>
            )
        }
    },
    Create: { 
        screen: ManageCategories,
        navigationOptions: {
            title: 'Create Your Topics',
            drawerIcon: () => (
                <Icon  
                type="Ionicons" name="ios-list-box-outline"  
                size={25}
                onPress={() => closeDrawer()}
               />
            ),

        }
    },
    Friends: { 
        screen: Friends,
        navigationOptions: {
            title: 'Connect with Friends',
            drawerIcon: () => (
                <Icon  
                type="Ionicons" name="ios-contacts-outline"  
                size={25}
                onPress={() => closeDrawer()}/>
            )
        }
    },
    Settings: { 
        screen: Settings,
        navigationOptions: {
            title: 'Settings',
            drawerIcon: () => (
                <Icon  
                type="Ionicons" 
                name="ios-options-outline"  
                size={25}
                onPress={() => closeDrawer()}/>
            )
        }
    },
    
   
});
const logInNavigation = createStackNavigator({
    LogInForm: { screen: LoginForm }
}, {
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
    }
});

const createCategoryNavigation = createStackNavigator({
    CreateCategory: { screen: CreateCategory }
}, {
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
    }
});

const stackNavigation = createStackNavigator({
    DrawerStack1: { screen: DrawerStack }
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});


const RootStack = createStackNavigator({
    drawerStack: { screen: stackNavigation },
    logIn: { screen: logInNavigation },
    createCategory: { screen: createCategoryNavigation }
},
{
     title: 'Main',
     initialRouteName: 'drawerStack',
     headerMode: 'none',
        navigationOptions: {
        headerVisible: false,
        }
});






 class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCZMPTBF7I-FEwxBH3D-fcX2ukGQrHYkA4',
            authDomain: 'conversationwheel-913f2.firebaseapp.com',
            databaseURL: 'https://conversationwheel-913f2.firebaseio.com',
            projectId: 'conversationwheel-913f2',
            storageBucket: 'conversationwheel-913f2.appspot.com',
            messagingSenderId: '151958554148'
          };

          firebase.initializeApp(config);
    };



     render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
         return (
         <Provider store={store}>
            <RootStack />
         </Provider>
         )   
     }
 }


export default App;







// class App extends Component {
//     render() {
//         return (
//             <Router />
//         )
//     }
// }

// export default App;