import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Platform,
  ImageBackground,
  TouchableHighlight
} from "react-native";
import { DrawerActions } from 'react-navigation';
import packageJson from '../../../package.json';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux'
import {
  switchCategory
} from '../../actions'
import { StackActions, NavigationActions } from 'react-navigation';
import { IMAGES } from '../../utils/ImageUtils';
import _ from 'lodash';
import { NavigationDrawerItem, ItemSeperator } from "../../components/ListItems";

var navigationDrawerItems = [
  { key: "membershipkey", label: "Membership", iconName: "membership" },
  { key: "loyalitieskey", label: "Loyalities", iconName: "loyalities" },
  { key: "mealkey", label: "Meal", iconName: "meal" },
  { key: "travelkey", label: "Travel", iconName: "travel" },
  { key: "reservationkey", label: "Reservation", iconName: "reservation" },


];
class drawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  _setUIDesignComponents() {


  }


  componentDidMount() {

    this._setUIDesignComponents()

  }




  onPressDrawerItem(itemKey) {

    this.props.navigation.closeDrawer()
  }

  _onCloseDrawer() {
    this.props.navigation.closeDrawer()

  }







  render() {

    // console.log("The Categories Data:::", this.props.categoryResponseData)

    // var dataItems = this.props.categoryResponseData
    const dataItems = this.navigationDrawerItems;

    console.log("The Categories Data:::", dataItems)

    return (

      <View style={{ flex: 1, backgroundColor: 'black', flexDirection: 'column' }}>

        <ImageBackground source={IMAGES.BACKGROUND1} style={{ flex: 1 }}>

          <View style={{ flex: 0.2, backgroundColor: 'transparent', flexDirection: 'row', paddingTop: 40, paddingLeft: 20 }}>

            <View style={{ flex: 0.2, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>

              <TouchableHighlight
                onPress={_ => this._onCloseDrawer()}
                style={{ width: 50, height: 50, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}
                underlayColor={'transparent'}
              >

                <Image source={IMAGES.CROSS} style={{width:22, height:22}}></Image>


              </TouchableHighlight>

            </View>

            <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>

              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  fontWeight: "500",
                  fontSize: 24,
                  color: 'white',
                  fontFamily: 'Montserrat',
                  marginTop: 0,
                  textAlign: 'center',


                }}>
                {'CATEGORIES'}
              </Text>
            </View>




          </View>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>

            <FlatList
              style={{ flex: 1, backgroundColor: 'transparent' }}
              data={dataItems}
              ItemSeparatorComponent={() => <ItemSeperator />}
              renderItem={(navigationItem) => {

                return <NavigationDrawerItem
                  onPressDrawerItem={() => this.onPressDrawerItem(navigationItem.item.key)}
                  itemIcon={navigationItem.item.iconUrl}
                  itemText={navigationItem.item.displayName} />

              }}
            />
          </View>



        </ImageBackground>
      </View>

    );
  }

}

drawerScreen.propTypes = {
  navigation: PropTypes.object
};




const mapStateToProps = (state) => {
  const { categoryResponseData } = state.auth


  return {
    categoryResponseData
  };
}

const mapDispatchToProps = dispatch => ({
  switchCategory: () => dispatch(switchCategory())
});


export default connect(mapStateToProps, mapDispatchToProps)(drawerScreen);


