import React from 'react';
import {
  Button,
  TouchableOpacity,
  Image,
  View,
  Text,
  Platform
} from 'react-native';
import { IMAGES } from '../../utils/ImageUtils';
import { DrawerActions } from 'react-navigation';


export const NavHeaderHamburger = (props) => {
  return (<TouchableOpacity style={{ padding: Platform.OS === 'android' ? 18 : 10, width: 50, height: 50 }} onPress={() => { props.navigation.openDrawer() }}>
    <Image
      style={{height: 35,
        width: 35,
        left: 8,
        position: "absolute"}}
      source={IMAGES.HAMBURGER}
    />
  </TouchableOpacity>);
}

export const NavHeaderProfile = (props) => {

  var count = props.alertsCount;
  isBadgeHidden = true;
  if (count == 0) {
    isBadgeHidden = true;
  } else {
    isBadgeHidden = false;
  }
  return (<TouchableOpacity style={{ padding: Platform.OS === 'android' ? 18 : 10, width: 50, height: 50 }} onPress={() => { props.navigation.navigate("AlertsStackNavigator") }}>

    <View style={{ flex: 1 }}>

      <Image
        style={{height: 35,
          width: 35,
          left: 8,
          position: "absolute"}}
        source={IMAGES.PROFILE}
      />
      
    </View>

  </TouchableOpacity>);
}

export const NavHeaderWithBackButton = (props) => {
  return (<TouchableOpacity style={{ padding: Platform.OS === 'android' ? 18 : 10, width: 50, height: 50 }} onPress={() => { props.navigation.goBack(null) }}>
    <Image
      style={ImageIconStyle}
      source={IMAGES.BACKBTN}
    />
  </TouchableOpacity>);
}


















