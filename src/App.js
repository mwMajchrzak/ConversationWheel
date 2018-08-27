import React, { Component } from 'react';
import { StatusBar, View, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, StackNavigator, DrawerNavigator, drawerIcon, goBack, NavigationActions, navigate } from 'react-navigation';
import Game from './components/Game';
import ManageCategories from './components/ManageCategories';
import Friends from './components/Friends';
import Settings from './components/Settings';
import CreateCategory from './components/CreateCategory';
import LoginForm from './components/LoginForm';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

const styles = {
    headerStyle: {
        height: 60,
        backgroundColor: '#66b3ff',
    },
    headerTitleStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        paddingBottom: 15
    },
}

const HamburgerIcon = (props) => {
    return (
        <View style={{ paddingLeft: 20, paddingBottom: 15 }}>
            <Icon
                type="Feather" name="menu"
                size={25}
                onPress={() => { props.navigation.openDrawer() }}
                color='white'
            />
        </View>
    )
};

const SectionIcon = (props) => {
    return (
            <IonIcon 
                type="Ionicons" name={props.name}
                size={25}
                onPress={() => { props.navigation.closeDrawer() }}
             />
    )
};

const GameStack = createStackNavigator({
    GameScreen: { screen: Game, }
}, {
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HamburgerIcon navigation={navigation} />,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle
        }),
})

const ManageCategoriesStack = createStackNavigator({
    ManageCategoriesScreen: { screen: ManageCategories, }
}, {
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HamburgerIcon navigation={navigation} />,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle
        }),
})

const ConnectWithFriendsScreen = createStackNavigator({
    ConnectWithFriendsScreen: { screen: Friends, }
}, {
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HamburgerIcon navigation={navigation} />,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle
        }),
})

const SettingsScreen = createStackNavigator({
    SettingsScreen: { screen: Settings, }
}, {
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HamburgerIcon navigation={navigation} />,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle
        }),
})

const DrawerStack = DrawerNavigator({
    Game: {
        screen: GameStack,
        navigationOptions: ({ navigation })=>({
            title: 'Game',
            drawerIcon: <SectionIcon navigation={navigation}  name="ios-aperture-outline"/>,
        })
    },
    Create: {
        screen: ManageCategoriesStack,
        navigationOptions: ({ navigation })=>({
            title: 'Your Categories',
            drawerIcon: <SectionIcon navigation={navigation} name="ios-list-box-outline"/>,

        })
    },
    Friends: {
        screen: ConnectWithFriendsScreen,
        navigationOptions: ({ navigation })=>({
            title: 'Connect with Friends',
            drawerIcon: <SectionIcon navigation={navigation} name="ios-contacts-outline"/>,
        })
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({ navigation })=>({
            title: 'Settings',
            drawerIcon: <SectionIcon navigation={navigation} name="ios-options-outline"/>,
        })
    },
});

const logInNavigation = createStackNavigator({
    LogInForm: { screen: LoginForm }
}, {
        navigationOptions: {
            // header: props => <CustomHeader {...props} />
            headerStyle: {
                height: 60,
                backgroundColor: '#66b3ff',

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 18,
                fontWeight: '600',
                color: 'white',
                paddingBottom: 15
            },
        },
        cardStyle: {
            shadowColor: 'transparent',
        },
    });

const createCategoryNavigation = createStackNavigator({
    CreateCategory: { screen: CreateCategory }
}, {

        navigationOptions: {
            headerStyle: {
                height: 60,
                backgroundColor: '#66b3ff',

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 18,
                fontWeight: '600',
                color: 'white',
                paddingBottom: 15
            },
        },
        cardStyle: {
            shadowColor: 'transparent',
        },
    });

const stackNavigation = createStackNavigator({
    DrawerStack1: { screen: DrawerStack }
}, {
        headerMode: 'none',
        cardStyle: {
            shadowColor: 'transparent',
        },
    });


const RootStack = createStackNavigator({
    drawerStack: { screen: stackNavigation },
    logIn: { screen: logInNavigation },
    createCategory: { screen: createCategoryNavigation }
},
    {
        initialRouteName: 'drawerStack',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        cardStyle: {
            shadowColor: 'transparent',
        },
    });
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[{ height: STATUSBAR_HEIGHT }, { backgroundColor }]}>
        <StatusBar style={{ shadowOpacity: 0, }} backgroundColor={backgroundColor} {...props} />
    </View>
);




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
                <View style={{ flex: 1 }}>
                    <MyStatusBar backgroundColor="#66b3ff" barStyle="light-content" />
                    <RootStack />
                </View>
            </Provider>
        )
    }
}



export default App;

