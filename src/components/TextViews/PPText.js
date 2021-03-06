import React, { Component } from 'react';
import { Text, Platform } from 'react-native';


export default class PPText extends Component {
    render() {
        const { style, text } = this.props;
        return (
            <Text style={[styles.textStyle, style]}>{text}</Text>
        );
    }
}


const styles = {
    textStyle: {
        fontFamily: 'Montserrat-Medium',
        color: 'white',
        fontSize: 20,
    }
}