import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, DrawerNavigator, drawerIcon } from 'react-navigation';
import Game from './components/Game';
import Create from './components/Create';
import Friends from './components/Friends';
import Settings from './components/Settings';
import LogIn from './components/LogIn';
import Icon from 'react-native-vector-icons/Ionicons';


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
        screen: Create,
        navigationOptions: {
            title: 'Create Your Topics',
            drawerIcon: () => (
                <Icon  
                type="Ionicons" name="ios-list-box-outline"  
                size={25}
                onPress={() => closeDrawer()}/>
            )
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
                type="Ionicons" name="ios-options-outline"  
                size={25}
                onPress={() => closeDrawer()}/>
            )
        }
    },
    
   
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
    logIn: { screen: LogIn }
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
     render() {
         return <RootStack />
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