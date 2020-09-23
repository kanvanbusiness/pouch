import React, { Component, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Button } from "../components/common";
import { IMAGES } from "../utils/ImageUtils";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {
  loginUser,
  loginUserAttempt,
  userSessionClearData,
  userLoginAttemptSessionClearData,
  categoriesClearData,
} from "../actions";
import Toast from "react-native-simple-toast";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import FlashMessage from "react-native-flash-message";
var userPhoneNumber;

class OTPVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      isEnableContinue: false,
    };
  }

  _onPressContinue() {
    let request = {
      username: userPhoneNumber.toString(),
      deviceId: "32423fdsfsdfsdfsdfsdsdfsdfsd",
      otp: this.state.code,
    };
    this.props.loginUserAttempt(request);
  }

  _onPressResend() {
    let request = {
      username: userPhoneNumber,
    };
    this.props.loginUser(request);
  }

  _onPressBack() {
    this.props.navigation.navigate("Login");
  }

  _dismissKeyboard = () => {
    // Dismiss Keyboard
    //  Keyboard.dismiss();
  };

  _onSetCode = (code) => {
    // this.props.updateloginWithPinErrorMsg('');
    let numreg = /^[0-9]+$/;

    if (numreg.test(code)) {
      this.setState({ code: code });
      if (code.length == 6) {
        // Dismiss Keyboard
        this._dismissKeyboard();
        this.setState({ isEnableContinue: true });
      } else {
        this.setState({ isEnableContinue: false });
      }
    } else {
      this.setState({ code: "" });
    }
  };

  _checkCode = (code) => {
    // this.props.updateloginWithPinErrorMsg('');
    // this.props.updatesiteUsererrorMsg('');

    console.warn("The Code:  " + code);
    let numreg = /^[0-9]+$/;

    if (numreg.test(code)) {
      if (code != "") {
      } else {
        this.setState({ code: code });
      }
    } else {
      this.setState({ code: "" });
    }
  };

  handleKeyPress({ nativeEvent: { key: keyValue } }) {
    if (keyValue === "Backspace") {
      // this.refs.refOfPreviousInput.focus();
      this.setState({ code: "" });
    }
  }

  _callDashboard() {
    AsyncStorage.setItem("OPTVerified", JSON.stringify(true));

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

  componentDidUpdate(prevProps) {
    if (this.props.isLoginSuccess !== prevProps.isLoginSuccess) {
      Toast.show("OTP Sent!", Toast.LONG);
      this.props.userSessionClearData();
    }

    if (this.props.isLoginAttemtSuccess !== prevProps.isLoginAttemtSuccess) {
      // this._callDashboard()
      this.props.userSessionClearData();
    }

    if (
      this.props.isCategoryDataGetSuccess !== prevProps.isCategoryDataGetSuccess
    ) {
      this._callDashboard();
      this.props.categoriesClearData();
    }

    if (this.props.isShowErrorAlert !== prevProps.isShowErrorAlert) {
      Toast.show(this.props.error, Toast.LONG);
      this.props.userSessionClearData();
    }

    console.log(" this.props.error OTP:", this.props.errorOTP);
    console.log(
      " this.props.error isShowErrorAlertOTP:",
      this.props.isShowErrorAlertOTP
    );

    if (this.props.isShowErrorAlertOTP) {
      let msg = this.props.errorOTP;

      if (msg === "We apologize, a technical error has occurred.") {
        Toast.show("We apologize, a technical error has occurred.", Toast.LONG);
      } else {
        Toast.show(msg, Toast.LONG);
      }
      this.props.userLoginAttemptSessionClearData();
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    userPhoneNumber = params.userPhoneNumber;
    // console.warn("home props", this.props)
    const { code } = this.state;

    console.log(" this.props.isShowErrorAlert:", this.props.isShowErrorAlert);
    console.log(" this.props.error:", this.props.error);
    console.log(" userPhoneNumber:", userPhoneNumber);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Spinner
          visible={this.props.isLoadingData || this.props.isLoadingDataOTP}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <ImageBackground
          source={IMAGES.BACKGROUND2}
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <View
                style={{
                  height: 150,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Platform.OS == "android" ? 25 : 50,
                  marginBottom: 50,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    marginTop: 0,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    backgroundColor: "transparent",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      width: 40,
                      height: 40,
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                    activeOpacity={0.5}
                    onPress={() => this._onPressBack()}
                  >
                    <Image
                      source={IMAGES.BACKBTN}
                      style={{
                        width: 30,
                        height: 30,
                        marginLeft: 0,
                        marginTop: 0,
                      }}
                    ></Image>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 24,
                      color: "#1b1a1a",
                      fontFamily: "Montserrat-Medium",
                      marginTop: 3,
                    }}
                  >
                    Welcome To
                  </Text>
                  <Text
                    style={{
                      color: "#db9435",
                      fontSize: 24,
                      marginLeft: 5,
                      fontFamily: "Montserrat-Medium",
                      marginTop: 3,
                    }}
                  >
                    Pouch
                  </Text>
                </View>

                <Image
                  source={IMAGES.LOGO2}
                  style={{ width: 57, height: 88, marginTop: 16 }}
                ></Image>
              </View>
              <View
                style={{
                  height: 420,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "95%",
                    height: 380,
                    flexDirection: "column-reverse",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    borderRadius: 60,
                    shadowColor: "#000000",
                    shadowOffset: { height: 10, width: 10 },
                    shadowOpacity: 0.5,
                    elevation: 5,
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={IMAGES.BACKGROUND1}
                    style={{ width: "100%", flex: 1, borderRadius: 60 }}
                  ></Image>
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      backgroundColor: "transparent",
                      position: "absolute",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontFamily: "Montserrat-Bold",
                        marginTop: 50,
                        textAlign: "center",
                      }}
                    >
                      GETTING STARTED
                    </Text>

                    <Text
                      style={{
                        fontSize: 22,
                        color: "#db9435",
                        fontFamily: "Montserrat-Medium",
                        marginTop: 25,
                        textAlign: "center",
                      }}
                    >
                      OTP
                    </Text>

                    <Text
                      style={{
                        marginLeft: 30,
                        marginRight: 30,
                        fontWeight: "200",
                        fontSize: 16,
                        color: "white",
                        fontFamily: "Montserrat-Medium",
                        marginTop: 20,
                        marginBottom: 25,
                        textAlign: "center",
                      }}
                    >
                      {"A 6 digit Code has been sent to +91 " + userPhoneNumber}
                    </Text>

                    <SmoothPinCodeInput
                      placeholder=""
                      cellStyle={{
                        borderWidth: 2,
                        borderRadius: 24,
                        borderColor: "transparent",
                        backgroundColor: "white",
                      }}
                      cellStyleFocused={{
                        borderColor: "white",
                        backgroundColor: "white",
                      }}
                      textStyle={{
                        fontSize: 24,
                        color: "black",
                        fontFamily: "Montserrat-Bold",
                      }}
                      textStyleFocused={{
                        color: "black",
                      }}
                      autoFocus={true}
                      mask={
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 25,
                            backgroundColor: "black",
                          }}
                        ></View>
                      }
                      value={code}
                      password={true}
                      codeLength={6}
                      cellSpacing={10}
                      onTextChange={(code) => this._onSetCode(code)}
                      onFulfill={this._checkCode}
                      onBackspace={() => console.log("No more back.")}
                      keyboardType={"number-pad"}
                      onKeyPress={this.handleKeyPress}
                    ></SmoothPinCodeInput>

                    <Text
                      style={{
                        marginLeft: 30,
                        marginRight: 30,
                        fontWeight: "200",
                        fontSize: 15,
                        color: "white",
                        fontFamily: "Montserrat-Medium",
                        marginTop: 20,
                        marginBottom: 5,
                        textAlign: "center",
                      }}
                    >
                      Don't get code
                    </Text>

                    <Button
                      onPress={() => {
                        this._onPressResend();
                      }}
                      children={"Resend"}
                      isEnable={true}
                      customButtonStyle={{
                        width: 202,
                        marginTop: 0,
                        height: 55,
                        justifyContent: "center",
                        backgroundColor: "transparent",
                      }}
                      customTextStyle={{
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        color: "#db9435",
                        fontSize: 22,
                        fontFamily: "Montserrat-Medium",
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 60,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Button
                  onPress={() => {
                    this._onPressContinue();
                  }}
                  children={"CONTINUE"}
                  isEnable={this.state.isEnableContinue}
                  customButtonStyle={{
                    width: 202,
                    marginTop: 20,
                    height: 55,
                    justifyContent: "center",
                    backgroundColor:
                      this.state.isEnableContinue == true
                        ? "#db9435"
                        : "transparent",
                    borderRadius: 50,
                    borderColor: "#db9435",
                    borderWidth: 2,
                  }}
                  customTextStyle={{
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: 18,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (request) => dispatch(loginUser(request)),
  loginUserAttempt: (request) => dispatch(loginUserAttempt(request)),
  userSessionClearData: () => dispatch(userSessionClearData()),
  categoriesClearData: () => dispatch(categoriesClearData()),
  userLoginAttemptSessionClearData: () =>
    dispatch(userLoginAttemptSessionClearData()),
});

const mapStateToProps = (state) => ({
  processingLogin: state.auth.processingLogin,
  loadingMessage: state.auth.loadingMessage,
  error: state.auth.error,
  responseData: state.auth.responseData,
  isShowErrorAlert: state.auth.isShowErrorAlert,
  isLoadingData: state.auth.isLoadingData,
  isLoginSuccess: state.auth.isLoginSuccess,
  phoneNumber: state.auth.phoneNumber,

  processingLoginOTP: state.otpget.processingLogin,
  loadingMessageOTP: state.otpget.loadingMessage,
  errorOTP: state.otpget.error,
  responseDataOTP: state.otpget.responseData,
  isShowErrorAlertOTP: state.otpget.isShowErrorAlert,
  isLoadingDataOTP: state.otpget.isLoadingData,
  isLoginAttemtSuccess: state.otpget.isLoginAttemtSuccess,
  isCategoryDataGetSuccess: state.otpget.isCategoryDataGetSuccess,
});

export default connect(mapStateToProps, mapDispatchToProps)(OTPVerification);
