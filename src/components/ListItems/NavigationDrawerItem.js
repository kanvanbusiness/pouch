import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { PPText } from '../TextViews';

export default class NavigationDrawerItem extends Component {


    getImage(itemIcon) {
        return (<Image  source={{ uri: itemIcon }} style={{ marginRight: 25, width: 35, height: 35, tintColor:'#db9435' }}></Image>)
    }

    
    render() {
        
        const { itemText, itemIcon, onPressDrawerItem } = this.props;

        return (
            <TouchableOpacity
                onPress={onPressDrawerItem}
                style={{
                    height: 70, backgroundColor: 'transparent',
                    justifyContent: 'center', alignSelf: 'stretch', paddingLeft: 34, flexDirection: 'column'
                }}>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        {this.getImage(itemIcon)}
                        <PPText text={itemText} />
                    </View>
                    

                </View>

            </TouchableOpacity>
        );
    }
}