import React, { Component } from 'react';
import { View } from 'react-native';


export default class ItemSeperator extends Component {


    render() {
        return <View style={{ height: 0, alignSelf: 'stretch', backgroundColor: 'white' }}></View>
    }
}