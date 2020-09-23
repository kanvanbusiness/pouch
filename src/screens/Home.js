import React, { Component } from "react";
import {
  View,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { Spinner } from "../components/common";
import { IMAGES } from "../utils/ImageUtils";
import { StackActions, NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { clearSwitchCategory } from "../actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appTitle: "Connected",
      appSubTitle: " Clinical Trials",
      pinCenerated: false,
      userLoggedInWithPin: false,
      logoSize: 109,
      isIPhone: false,
    };
  }

  componentWillMount() {
    this.props.clearSwitchCategory();
  }

  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem("OPTVerified", (err, value) => {
        if (err) {
          console.log(err);
          this.callLoginScreen();
        } else {
          if (JSON.parse(value)) {
            // boolean true or false
            this.callDashboardScreen();
          } else {
            this.callLoginScreen();
          }
        }
      });
    }, 3000);
  }

  callLoginScreen() {
    const resetActionLogin = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Login",
        }),
      ],
    });
    this.props.navigation.dispatch(resetActionLogin);
  }

  callDashboardScreen() {
    const resetActionDashboard = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "DrawerNavigator",
        }),
      ],
    });
    this.props.navigation.dispatch(resetActionDashboard);
  }

  render() {
    // console.warn("home props", this.props)
    return (
      <View style={styles.splashScreenContainer}>
        <ImageBackground source={IMAGES.SPALSH} style={styles.backgroundImage}>
          <View
            style={{
              width: "100%",
              height: "50%",
              backgroundColor: "transparent",
            }}
          ></View>
          <View
            style={{
              width: "100%",
              height: "50%",
              backgroundColor: "transparent",
              paddingTop: 30,
            }}
          >
            {/* <Spinner></Spinner> */}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  splashScreenContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover", // or 'stretch'
  },
};

const mapDispatchToProps = (dispatch) => ({
    clearSwitchCategory: () => dispatch(clearSwitchCategory()),
});

const mapStateToProps = state => ({
    //Auth Objects
    authToken: state.otpget.authToken,
    category: state.otpget.category,
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
