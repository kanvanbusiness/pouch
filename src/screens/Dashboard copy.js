import React, { Component, useState } from "react";
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
  StatusBar,
  Alert,
} from "react-native";
import { IMAGES } from "../utils/ImageUtils";
import Carousel from "react-native-snap-carousel";
import FlipCard from "react-native-flip-card";
import { connect } from "react-redux";
import {
  getAllCardLists,
  cardsListClearData,
  clearSwitchCategory, getCardTemplates
} from "../actions";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-simple-toast";

import RNReactNativeZlib from "@klarna/react-native-zlib";
import base64 from "react-native-base64";
import { Buffer } from "buffer";
import LinearGradient from 'react-native-linear-gradient';

const SLIDER_WIDTH = Dimensions.get("window").width;
const SLIDER_HEIGHT = Dimensions.get("window").height;

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <View />,
  });

  constructor(props) {
    super(props);
    this.state = {
      listViewData: Array(100)
        .fill("")
        .map((_, i) => ({
          key: `${i}`,
          text:
            "Adherence score of subject SUB11201, from study ALZ2004 is at “0”. This patient has fallen into the lowest adherence threshold range.",
          selected: false,
        })),
    };

    //Add willfocus event listeners
    this._onwillFocusReference = this.props.navigation.addListener(
      "willFocus",
      () => this.viewWillFocus()
    );
  }

  viewWillFocus() {
    this.props.getAllCardLists(this.props.authToken);
    this.props.getCardTemplates(this.props.authToken);
  }

  onPressCardItem = (item) => {
    Alert.alert("Confirm Alet", "Do you really want to delete this card?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => this.deleteThisCard(),
      },
    ]);
  };

  deleteThisCard = () => {
    Alert.alert("Confirm Alet", "Cart has been deleted successfully!");
  };

  getImageType = (type) => {
    switch (type.toLowerCase()) {
      case "punarnava-bronze":
        return IMAGES.bronze;
      case "punarnava-silver":
        return IMAGES.silver;
      case "punarnava-gold":
        return IMAGES.gold;
      case "punarnava-platinum":
        return IMAGES.platinum;

      default:
        return null;
    }
  };

  getTextType = (type) => {
    switch (type.toLowerCase()) {
      case "punarnava-bronze":
        return "BRONZE";
      case "punarnava-silver":
        return "SILVER";
      case "punarnava-gold":
        return "GOLD";
      case "punarnava-platinum":
        return "PLATINUM";

      default:
        return "";
    }
  };

  _renderItem = ({ item, index }) => {

    
    let base64Logo = `data:image/png;base64,${item.qrCode}`;
    // let base64Logo = `data:image/svg;base64,${item.qrCode}`;
    // // const testString = `{ experiment: ${item.qrCode}}`;
    // // const testString = item.qrCode;
    // // const testString = base64Logo;
    //  const encoded = base64.encode(item.qrCode);
    // // // const encoded = Buffer.from(testString).toString("base64");

    //  RNReactNativeZlib.deflate(item.qrCode).then((data) => {
    //     // console.log(testString)
    //     // console.log('Data', data)
    //   // base64 --> byte[] --> compressed byte[] --> base64
    //     RNReactNativeZlib.inflate(item.qrCode).then((buffer) => {
    //       console.log(buffer);
    //       const result = base64.decode(buffer);
    //        result = Buffer.from(buffer, "base64").toString("utf8");
    //   //     // decompressed
    //       console.log('Decompressed ', result)
    //   //     console.log('Result ', result)
    //   //     base64Logo = result;
    //   });
    //   // base64Logo = `data:image/png;base64,${data}`;
    // });

    // RNReactNativeZlib.inflate(item.qrCode).then(decompressed => {
      // console.log('Data', decompressed);
      // console.log( base64.decode(decompressed));
      

    // });

//     RNReactNativeZlib.inflateBase64(Buffer.from(item.qrCode).toString("base64")).then(decompressed => {
      
//       try {
//       const result1 = base64.decode(decompressed);
//       } catch(e) {
//         console.log(e)
//       }

//       try {
//       const result2 = Buffer.from(decompressed, 'base64').toString('utf8')
//     } catch(e) {
//       console.log(e)
//     }
//       // decompressed
//       console.log('Result1',result1);


//     console.log('buffer', decompressed);
// console.log(result2);

//     })
     

    return (
      <View
        key={index}
        style={{
          width: SLIDER_WIDTH - 40,
          height: SLIDER_HEIGHT * 0.8,
          //width: 321.39,
          //height: 445
        }}
      >
        <FlipCard
          friction={8}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={false}
          clickable={true}
          style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}
        >
          {/* Front Side */}
          <ImageBackground source={IMAGES.cardBg} >
            
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ flex: 1 }}>

            {/* Top Area */}
            <View style={[styles.align, styles.topArea]}>
              <Image
                source={IMAGES.punarnava}
                style={{ width: 60, height: 60, resizeMode: "contain" }}
              />
              <View style={{ marginRight: 20 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    fontFamily: "Montserrat-Thin",
                  }}
                >
                  REMAINING BALANCE:
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontFamily: "Montserrat-ExtraLight",
                  }}
                >
                  {item.balance} NIGHTS
                </Text>
              </View>
            </View>
            {/* Card Type (Gold, silver etc.) */}
            <ImageBackground
              source={this.getImageType(item.templateName)}
              style={{ height: SLIDER_HEIGHT * 0.15, paddingHorizontal: 30 }}
            >
              <Text
                style={{
                  fontSize: 27.5,
                  color: "white",
                  fontFamily: "Montserrat-Thin",
                  lineHeight: 40,
                }}
              >
                {this.getTextType(item.templateName)}
              </Text>
              <Text
                style={{
                  fontSize: 21,
                  color: "white",
                  fontFamily: "Montserrat-ExtraLight",
                  marginBottom: 5,
                }}
              >
                {item.accountNo}
              </Text>
              <View style={[styles.align, { width: "70%" }]}>
                <View style={styles.row}>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "white",
                        fontFamily: "Montserrat-Thin",
                      }}
                    >
                      VALID
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "white",
                        fontFamily: "Montserrat-Thin",
                      }}
                    >
                      THRU
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: "Montserrat-ExtraLight",
                    }}
                  >
                    {" "}
                    {item.expiry && item.expiry.replace("/", "-")}
                  </Text>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "white",
                        fontFamily: "Montserrat-Thin",
                      }}
                    >
                      DUE
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "white",
                        fontFamily: "Montserrat-Thin",
                      }}
                    >
                      DATE
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: "Montserrat-ExtraLight",
                    }}
                  >
                    {" "}
                    {item.renewalDate && item.renewalDate.replace("/", "-")}
                  </Text>
                </View>
              </View>
            </ImageBackground>
            {/* QE CODE AREA */}
            <View style={{ paddingHorizontal: 30 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontFamily: "Montserrat-ExtraLight",
                  lineHeight: 25,
                  marginVertical: 10,
                }}
              >
                {item.nameOnAccount}
              </Text>
              <Image source={{ uri: base64Logo }} style={styles.qrCode} />
              {/* <Image source={IMAGES.qrCode} style={styles.qrCode} /> */}
            </View>
            {/* Bottom Area */}
            {/* <View style={styles.url}>
                            <Text style={{
                                fontSize: 9,
                                color: 'black',
                                fontFamily: 'bradhitc',
                            }}>In Collaboration With</Text>
                            <Text style={{
                                fontSize: 7,
                                color: 'black',
                                fontFamily: 'arlrdbd',
                            }}>www.smvcationworld.com</Text>
                        </View> */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => this.onPressCardItem(item)}
            >
              <Image source={IMAGES.btn} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>

            </LinearGradient>

          </ImageBackground>


          {/* Back Side */}
          <ImageBackground source={IMAGES.yogaPose} style={{ flex: 1 }}>
            <View style={{ alignItems: "center", paddingHorizontal: 40 }}>
              {/* Top Area */}
              <Image source={IMAGES.punarnava} style={styles.punarnava} />
              <Text
                style={{
                  fontSize: 10,
                  color: "black",
                  fontFamily: "arlrdbd",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Village- Bhitarli, Kimadi, Lambidhar - Mussoorie Road, Dehradun,
                Uttarakhand, India
              </Text>
              {/* <Text style={{
                                fontSize: 14,
                                color: 'black',
                                fontFamily: 'arlrdbd',
                                textAlign: 'center',
                                marginTop: 5
                            }}>Mobile No. +91-8447100000</Text>
                            <Text style={{
                                fontSize: 9,
                                color: 'black',
                                fontFamily: 'arlrdbd',
                                textAlign: 'center',
                                marginTop: 5
                            }}>www.Purnarnava.com</Text>
                            <Text style={{
                                fontSize: 9,
                                color: 'black',
                                fontFamily: 'arlrdbd',
                                textAlign: 'center',
                                marginTop: 5
                            }}>reservation@punarnava.com</Text> */}
              <Image
                source={IMAGES.smWorld}
                style={{
                  width: "100%",
                  height: 45,
                  resizeMode: "contain",
                  marginTop: SLIDER_HEIGHT * 0.1,
                }}
              />
              {/* <Text style={{
                                fontSize: 14,
                                color: 'black',
                                fontFamily: 'arlrdbd',
                                textAlign: 'center',
                                marginTop: 5
                            }}>Toll Free No. 18005322060</Text>
                            <Text style={{
                                fontSize: 9,
                                color: 'black',
                                fontFamily: 'arlrdbd',
                                textAlign: 'center',
                                marginTop: 6
                            }}>www.smvcationworld.com</Text>
                            <Text style={{
                                fontSize: 9,
                                color: 'black',
                                fontFamily: 'arlrdbd',
                                textAlign: 'center',
                                marginTop: 5
                            }}>reservation@smvcationworld.com</Text> */}
            </View>
          </ImageBackground>
        </FlipCard>
      </View>
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.isCardListingSuccess !== prevProps.isCardListingSuccess) {
      {
        console.log("Cards listing:: ", this.props.responseData)
      }
      this.props.cardsListClearData();
    }

    console.log('Card Templates ', this.props.card_templates)
  }

  leftIconAction = () => {
    if (this.props.category) {
      this.props.clearSwitchCategory();
    } else {
      this.props.navigation.openDrawer();
    }
  };

  getHeaderName = () => {
    if (this.props.category) {
      return this.props.category.displayName;
    } else {
      return "";
    }
  };

  getFilteredCardLists = (cardData) => {
    if (this.props.category) {
      return cardData.filter((x) => x.categoryId == this.props.category.id);
    } else {
      return cardData;
    }
  };

  render() {
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
      "window"
    );

    if (this.props.isShowErrorAlert) {
      Toast.show(this.props.error, Toast.LONG);
      this.props.cardsListClearData();
    }

    let cardList = this.getFilteredCardLists(this.props.responseData);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={IMAGES.CARD_LISTING_BG}
          style={[styles.align, styles.header]}
        >
          <TouchableOpacity onPress={this.leftIconAction}>
            {this.props.category ? (
              <Image
                style={{
                  height: 16,
                  width: 16,
                  zIndex: 2,
                  tintColor: "black",
                }}
                source={IMAGES.close}
              />
            ) : (
              <Image
                style={{
                  height: 20,
                  width: 20,
                  zIndex: 2,
                  tintColor: "black",
                }}
                source={IMAGES.HAMBURGER}
              />
            )}
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontFamily: "Montserrat-Medium",
            }}
          >
            {this.getHeaderName()}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          >
            <Image
              style={{
                height: 30,
                width: 30,
              }}
              source={IMAGES.avatar}
            />
          </TouchableOpacity>
        </ImageBackground>

        <Spinner
          visible={this.props.isLoadingData}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />

        <ImageBackground
          source={IMAGES.CARD_LISTING_BG}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20
          }}
        >
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={cardList.length > 0 ? cardList : []}
            renderItem={this._renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={SLIDER_WIDTH - 40}
            layout="stack"
            //containerCustomStyle={{ paddingTop: 50 }}
            layoutCardOffset={16}
            inactiveSlideOpacity={0.5}
            // inactiveSlideScale={1}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent"
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
  topArea: {
    height: SLIDER_HEIGHT * 0.1,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  qrCode: {
    width: "100%",
    height: SLIDER_HEIGHT * 0.36,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    resizeMode: "cover",
  },
  url: {
    alignSelf: "center",
    bottom: SLIDER_WIDTH * 0.13,
    position: "absolute",
  },
  btn: {
    position: "absolute",
    bottom: 15,
    right: 10,
  },
  punarnava: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 43.522,
  },
});

const mapDispatchToProps = (dispatch) => ({
  getAllCardLists: (authToken) => dispatch(getAllCardLists(authToken)),
  getCardTemplates: (authToken) => dispatch(getCardTemplates(authToken)),
  cardsListClearData: () => dispatch(cardsListClearData()),
  clearSwitchCategory: () => dispatch(clearSwitchCategory()),
});

const mapStateToProps = (state) => ({
  //Cards Objects
  processingCardsLosting: state.cards.processingCardsLosting,
  error: state.cards.error,
  responseData: state.cards.responseData,
  isShowErrorAlert: state.cards.isShowErrorAlert,
  isLoadingData: state.cards.isLoadingData,
  isCardListingSuccess: state.cards.isCardListingSuccess,
  card_templates: state.cards.card_templates,

  //Auth Objects
  authToken: state.otpget.authToken,
  category: state.otpget.category,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
