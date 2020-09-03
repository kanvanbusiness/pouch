import React, { Component, useState } from 'react';
import {
    View,
    ActivityIndicator,
    ImageBackground,
    Image,
    Button,
    TouchableOpacity,
    Dimensions,
    Animated,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';
import { StackActions, NavigationActions } from '@react-navigation/native';
import { IMAGES } from '../utils/ImageUtils'



class Profile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,

            headerShown: true,
            title: 'Profile',
            headerStyle: { backgroundColor: '#1b1a1a' },
            headerTintColor: 'black',
            headerLeft: <TouchableOpacity style={{ padding: Platform.OS === 'android' ? 10 : 5, width: 50, height: 50 }} onPress={() => { navigation.goBack() }}>
                <Image
                    style={{
                        height: 35,
                        width: 35,
                        left: 8,
                        tintColor:'#db9435'
                    }}
                    source={IMAGES.BACKBTN}
                />
            </TouchableOpacity>,
   
        }
    };

    
    constructor(props) {
        super(props);
        

       

    }

    
    render() {

        return (
            <View style={styles.container}>

                {/* <ImageBackground source={IMAGES.HEADERBG} style={{ flex: 1 }}>
                   

                </ImageBackground> */}

            </View >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
    },


   

});



export default Profile

