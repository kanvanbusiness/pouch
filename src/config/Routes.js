import React, { Component } from 'react';
import { Button, View,TouchableOpacity, Image } from 'react-native';
import {
    createAppContainer,
} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import NavigationService from './NavigationService';

import Home from '../screens/Home';
import Login from '../screens/Login';
import OTPVerification from '../screens/OTPVerification';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';
import DrawerScreen from '../components/common/DrawerScreen';
import { IMAGES } from '../utils/ImageUtils'


const DashboardStackNavigator = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            headerVisible: false,
            gesturesEnabled: false
        },
    }
});

const DrawerNavigator = createDrawerNavigator({
    Dashboard: DashboardStackNavigator,

}, {
    initialRouteName: 'Dashboard',
    contentComponent: DrawerScreen,
    drawerWidth: 320,
    drawerPosition: 'left',
    backBehavior: 'none',
});

const StackNavigator = createStackNavigator({

    //important: key and screen name (i.e. DrawerNavigator) should be 
    //same while using the drawer navigator inside stack navigator.

    Home: {
        screen: Home,
        navigationOptions: {
            gesturesEnabled: false,
            headerShown: false
            
        },
    },

    Login: {
        screen: Login,
        navigationOptions: {
            gesturesEnabled: false,
            headerShown: false
            
        },
    },
    OTPVerification: {
        screen: OTPVerification,
        navigationOptions: {
            gesturesEnabled: false,
            headerShown: false
            
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            gesturesEnabled: false,
        }       
    },

  
    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: false,
            headerShown: false,
            headerVisible: true,
            gesturesEnabled: false

        },
    },

  
},
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            // header: null
            headerMode: 'screen'

        }
    }


);







//export default createAppContainer(StackNavigator);

export const AppStack = createAppContainer(StackNavigator);

class AppNavigation extends Component {
    render() {
        return (
            <AppStack
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }

}


export default AppNavigation;






