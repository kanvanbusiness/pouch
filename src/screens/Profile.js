import React, { Component, useState } from "react";
import {
  View,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput, AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "@react-navigation/native";
import { IMAGES } from "../utils/ImageUtils";
import { getUserInfo, resetUserRequest, updateUserInfo } from "../actions";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from 'react-native-simple-toast';
import { userSessionClearData } from "../actions";


class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <View />,
  });

  // static navigationOptions = ({ navigation }) => {
  //     return {
  //         headerTransparent: true,
  //         headerShown: true,
  //         title: 'Profile',
  //         headerStyle: { backgroundColor: '#1b1a1a' },
  //         headerTintColor: 'black',
  //         headerLeft: () => <TouchableOpacity style={{ padding: Platform.OS === 'android' ? 10 : 5, width: 50, height: 50 }} onPress={() => { navigation.goBack() }}>
  //             <Image
  //                 style={{
  //                     height: 25,
  //                     width: 25,
  //                     left: 8,
  //                     tintColor:'#db9435'
  //                 }}
  //                 source={IMAGES.BACKBTN}
  //             />
  //         </TouchableOpacity>,

  //     }
  // };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      isLoading: false,
    };
  }

  componentWillMount() {
    this.props.getUserInfo(this.props.authToken);
  }

  componentDidUpdate() {
    let userData = this.props.user_info;
    if (userData && this.state.firstName == "" && this.state.lastName == "") {
      this.setState({
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
    }

    if (this.props.update_user_err_msg) {
      this.props.resetUserRequest();
      console.log(this.props.update_user_err_msg)
      this.setState({ isLoading: false });
      Toast.show(this.props.update_user_err_msg, Toast.LONG);
    } else if (this.props.update_user) {
      this.props.resetUserRequest();
      this.setState({ isLoading: false });
      Toast.show("Updated Successfully.", Toast.LONG);
      this.props.navigation.goBack();
    }
  }

  updateUserInfo = () => {
    this.setState({ isLoading: true });
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    this.props.updateUserInfo(this.props.authToken, data);
  };

  logout = () => {
    this.props.userSessionClearData();

    AsyncStorage.setItem("OPTVerified", JSON.stringify(false));

    const resetActionDashboard = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Login",
        }),
      ],
    });
    this.props.navigation.dispatch(resetActionDashboard);

  }

  render() {
    console.log("User Data", this.props.user_info);

    return (
      <View style={styles.container}>
        <View style={[styles.align, styles.header]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              style={{
                height: 20,
                width: 20,
                zIndex: 2,
                tintColor: "#db9435",
              }}
              source={IMAGES.BACKBTN}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontFamily: "Montserrat-Medium",
            }}
          >
            Profile
          </Text>
          <View>
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>this.logout()}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#db9435",
              fontFamily: "Montserrat-SemiBold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
          </View>
        </View>

        <Spinner
          visible={this.state.isLoading}
          textContent={"Updating..."}
          textStyle={{ color: "#FFF" }}
        />

        <View style={{ marginHorizontal: 20, marginTop: 60 }}>
          <TextInput
            value={this.state.firstName}
            onChangeText={(text) => this.setState({ firstName: text })}
            style={styles.input}
          />
          <TextInput
            value={this.state.lastName}
            onChangeText={(text) => this.setState({ lastName: text })}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.updateUserInfo}
          style={styles.btn}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#db9435",
              fontFamily: "Montserrat-SemiBold",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },

  header: {
    width: "100%",
    padding: 20,
    paddingVertical: 10,
  },

  align: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 15,
  },
  btn: {
    width: 160,
    height: 35,
    borderWidth: 2,
    borderColor: "#db9435",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
  },
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (authToken) => dispatch(getUserInfo(authToken)),
  updateUserInfo: (authToken, data) => dispatch(updateUserInfo(authToken, data)),
  resetUserRequest: () => dispatch(resetUserRequest()),
  userSessionClearData: () => dispatch(userSessionClearData()),
});

const mapStateToProps = (state) => ({
  //Auth Objects
  authToken: state.otpget.authToken,

  user_info: state.auth.user_info,
  update_user: state.auth.update_user,
  update_user_err_msg: state.auth.update_user_err_msg,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
