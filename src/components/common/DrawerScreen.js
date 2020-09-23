import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Platform,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { DrawerActions } from "react-navigation";

import { connect } from "react-redux";
import { switchCategory } from "../../actions";
import { StackActions, NavigationActions } from "react-navigation";
import { IMAGES } from "../../utils/ImageUtils";
import _ from "lodash";
import {
  NavigationDrawerItem,
  ItemSeperator,
} from "../../components/ListItems";

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
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressDrawerItem(item) {
    console.log('data', item)
    this.props.switchCategory(item);
    this.props.navigation.closeDrawer();
  }

  _onCloseDrawer = () => {
    this.props.navigation.closeDrawer();
  };

  render() {
    let dataItems = this.props.categoryResponseData;

    return (
      <View
        style={{ flex: 1, backgroundColor: "black", flexDirection: "column" }}
      >
        <ImageBackground source={IMAGES.BACKGROUND1} style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.2,
              backgroundColor: "transparent",
              flexDirection: "row",
              paddingTop: 40,
              paddingLeft: 20,
            }}
          >
            <View
              style={{
                flex: 0.2,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={this._onCloseDrawer}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 5,
                }}
                underlayColor={"transparent"}
              >
                <Image
                  source={IMAGES.CROSS}
                  style={{ width: 18, height: 18 }}
                ></Image>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  fontSize: 22,
                  color: "white",
                  fontFamily: "Montserrat-SemiBold",
                  marginTop: 0,
                  textAlign: "center",
                }}
              >
                CATEGORIES
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "transparent" }}>
            {dataItems.length > 0 && (
              <FlatList
                style={{ flex: 1, backgroundColor: "transparent" }}
                data={dataItems}
                ItemSeparatorComponent={() => <ItemSeperator />}
                renderItem={({item, index}) => {
                  return (
                    <NavigationDrawerItem
                      key={index}
                      onPressDrawerItem={() => this.onPressDrawerItem(item)}
                      itemIcon={item.iconUrl}
                      itemText={item.displayName}
                    />
                  );
                }}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

drawerScreen.propTypes = {
  navigation: PropTypes.object,
};

const mapStateToProps = (state) => ({
  categoryResponseData: state.otpget.categoryResponseData,
});

const mapDispatchToProps = (dispatch) => ({
  switchCategory: (catData) => dispatch(switchCategory(catData))
});

export default connect(mapStateToProps, mapDispatchToProps)(drawerScreen);
