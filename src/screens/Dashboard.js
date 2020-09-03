import React, { Component, useState } from 'react';
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
} from 'react-native';
import { IMAGES } from '../utils/ImageUtils'
import Carousel from 'react-native-snap-carousel';
import FlipCard from 'react-native-flip-card';
import { connect } from 'react-redux';
import {
    getAllCardLists,
    cardsListClearData
} from '../actions'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

const SLIDER_WIDTH = Dimensions.get('window').width;

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
class Dashboard extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerShown: true,
            title: 'All',
            headerStyle: { backgroundColor: '#1b1a1a' },
            headerTintColor: 'black',
            headerLeft: <TouchableOpacity style={{ padding: Platform.OS === 'android' ? 10 : 5, width: 50, height: 50 }} onPress={() => { navigation.openDrawer() }}>
                <Image
                    style={{
                        height: 35,
                        width: 35,
                        left: 8,
                    }}
                    source={IMAGES.HAMBURGER}
                />
            </TouchableOpacity>,
            headerRight: <TouchableOpacity style={{ padding: Platform.OS === 'android' ? 10 : 5, width: 50, height: 50 }} onPress={() => { navigation.navigate('Profile') }}>
                <Image
                    style={{
                        height: 35,
                        width: 35,
                        right: 8,
                    }}
                    source={IMAGES.PROFILE}
                />
            </TouchableOpacity>,

        }
    };

    constructor(props) {
        super(props);
        this.state = {
            listViewData: Array(100).fill('').map((_, i) => ({ key: `${i}`, text: 'Adherence score of subject SUB11201, from study ALZ2004 is at “0”. This patient has fallen into the lowest adherence threshold range.', selected: false })),

        }

        //Add willfocus event listeners
        this._onwillFocusReference = this.props.navigation.addListener('willFocus', () => this.viewWillFocus())
    }

    componentDidMount() {

    }

    componentWillMount() {

    }

    viewWillFocus() {
        this.props.getAllCardLists(this.props.authToken)
    }

    onPressCardItem = (item) => {
        Alert.alert(  
            'Confirm Alet',  
            'Do you really want to delete this card?',
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {
                    text: 'OK', 
                    onPress: () => this.deleteThisCard()
                },  
            ]  
        ); 
    }

    deleteThisCard = () => {
        Alert.alert(  
            'Confirm Alet',  
            'Cart has been deleted successfully!',
        ); 
     }


    _variantTypeText = (type) => {

        let getType = type.toLowerCase()
        let variantN = capitalize(getType)

        switch (getType) {

            case 'gold':
                return (<Text style={{
                    textAlign: 'center',
                    fontWeight: "500",
                    fontSize: 37,
                    color: '#E9C250',
                    fontFamily: 'Montserrat',
                    marginLeft: 30,
                }}>{variantN}</Text>)

            case 'platinum':
                return (<Text style={{
                    textAlign: 'center',
                    fontWeight: "500",
                    fontSize: 37,
                    color: 'white',
                    fontFamily: 'Montserrat',
                    marginLeft: 30,
                }}>{variantN}</Text>)
            case 'silver':
                return (<Text style={{
                    textAlign: 'center',
                    fontWeight: "500",
                    fontSize: 37,
                    color: '#67A3AF',
                    fontFamily: 'Montserrat',
                    marginLeft: 30,
                }}>{variantN}</Text>)

            default:
                return null
        }


    }

    _getPatchVariant = (type) => {

        let getType = type.toLowerCase()

        switch (getType) {

            case 'gold':
                return (IMAGES.GOLD_PATCH)

            case 'platinum':
                return (IMAGES.PLATINUM_PATCH)
            case 'silver':
                return (IMAGES.SILVER_PATCH)

            default:
                return null
        }


    }


    _renderItem = ({ item, index }) => {
        // console.log('item', item);
        let base64Logo = 'data:image/png;base64,' + item.qrCode;
        return (


            <View style={{ height: '95%', width: '95%', backgroundColor: '#3A295C', justifyContent: 'center', borderRadius: 20 }}>

                <FlipCard
                    friction={8}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}

                    style={{
                        flex: 1,
                    }}>

                    {/* Face Side */}
                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 0.3, width: '100%', backgroundColor: 'transparent', flexDirection: 'row' }}>
                            <View style={{ flex: 1, backgroundColor: 'transparent' }}>


                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 30 }}>

                                <Text style={{
                                    textAlign: 'center',
                                    fontWeight: "300",
                                    fontSize: 12,
                                    color: 'white',
                                    fontFamily: 'Montserrat',
                                    paddingBottom: 5

                                }}>{'REMAINING BALANCE'}</Text>

                                <Text style={{
                                    textAlign: 'center',
                                    fontWeight: "300",
                                    fontSize: 20,
                                    color: 'white',
                                    fontFamily: 'Montserrat'
                                }}>{item.balance}</Text>

                            </View>


                        </View>
                        <View style={{ flex: 0.4, width: '100%', backgroundColor: 'transparent' }}>

                            <ImageBackground source={this._getPatchVariant(item.variant)}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <ImageBackground source={IMAGES.GRAPHIC}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <View style={{ flex: 0.6, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-start', flexDirection: 'column' }}>
                                        {/* <Text style={{
                                            textAlign: 'center',
                                            fontWeight: "500",
                                            fontSize: 37,
                                            color: '#E9C250',
                                            fontFamily: 'Montserrat',
                                            marginLeft: 30,
                                        }}>{item.variant}</Text> */}

                                        {this._variantTypeText(item.variant)}
                                    </View>

                                    <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                                        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 30, paddingBottom: 10 }}>

                                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                <Text
                                                    adjustsFontSizeToFit
                                                    style={{
                                                        textAlign: 'left',
                                                        fontWeight: "400",
                                                        fontSize: 17,
                                                        color: 'white',
                                                        fontFamily: 'Montserrat',

                                                    }}>{item.accountNo}</Text>
                                            </View>
                                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                                                <View style={{ flex: 0.2, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                    <Text
                                                        adjustsFontSizeToFit
                                                        numberOfLines={1}
                                                        style={{
                                                            fontWeight: "500",
                                                            fontSize: 7,
                                                            color: 'white',
                                                            fontFamily: 'Montserrat',
                                                            marginTop: 10,
                                                            textAlign: 'center',


                                                        }}>
                                                        {'VALID'}
                                                    </Text>

                                                    <Text
                                                        adjustsFontSizeToFit
                                                        numberOfLines={1}
                                                        style={{
                                                            fontWeight: "500",
                                                            fontSize: 7,
                                                            color: 'white',
                                                            fontFamily: 'Montserrat',
                                                            marginTop: 0,
                                                            textAlign: 'center',


                                                        }}>
                                                        {'THRU'}
                                                    </Text>

                                                </View>
                                                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                                    <Text
                                                        adjustsFontSizeToFit
                                                        numberOfLines={1}
                                                        style={{
                                                            fontWeight: "500",
                                                            fontSize: 13,
                                                            color: 'white',
                                                            fontFamily: 'Montserrat',
                                                            marginLeft: 4,
                                                            marginTop: 10,
                                                            textAlign: 'center',


                                                        }}>
                                                        {item.expiry}
                                                    </Text>
                                                </View>

                                            </View>

                                        </View>
                                        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 30, paddingBottom: 10 }}>

                                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                                <Text
                                                    adjustsFontSizeToFit
                                                    style={{
                                                        textAlign: 'right',
                                                        fontWeight: "400",
                                                        fontSize: 12,
                                                        color: 'white',
                                                        fontFamily: 'Montserrat',

                                                    }}>{'RENEWAL DUE DATE'}</Text>
                                            </View>
                                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                <Text
                                                    adjustsFontSizeToFit
                                                    style={{
                                                        textAlign: 'right',
                                                        fontWeight: "500",
                                                        fontSize: 13,
                                                        marginTop: 10,
                                                        color: 'white',
                                                        fontFamily: 'Montserrat',

                                                    }}>{item.renewalDate}</Text>
                                            </View>


                                        </View>
                                    </View>
                                </ImageBackground>

                            </ImageBackground>






                        </View>
                        <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent' }}>
                            <View style={{ flex: 0.2, backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', paddingLeft: 30 }}>
                                <Text
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                    style={{
                                        fontWeight: "300",
                                        fontSize: 20,
                                        color: 'white',
                                        fontFamily: 'Montserrat',
                                        marginBottom: 0,
                                        textAlign: 'center',


                                    }}>
                                    {item.nameOnAccount}
                                </Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', padding: 50 }}>

                                <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                                    <Image source={{uri: base64Logo}} style={{width:'80%', height:'80%'}}></Image>

                                
                                </View>

                            </View>

                        </View>
                        <View style={{ flex: 0.1, width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <View style={{ flex: 0.8, top: -10, left: 15, textAlign:'left' }} >
                                <Text style={{ color: '#ffffff' }} >Powered By : SM Vacation world</Text>
                            </View>            
                            <TouchableOpacity
                                style={{
                                    flex: 0.1, paddingRight: 0, bottom: 12, right: -20
                                }}
                                onPress={() => this.onPressCardItem(item)}>
                                <Image source={IMAGES.DELETE_BTN1}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Back Side */}
                    <View style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center',
             
                    }}>
                        <ImageBackground source={IMAGES.BACK_BG_WITH_STRIPE} style={{ width: '100%', height: '100%', textAlign: 'center', borderColor: '#3A295C', borderWidth: 1,  borderRadius: 10,}}>
                            <View style={{ height: '100%', width: '95%', textAlign: 'center', borderRadius: 20, marginTop: 40 }}>
                                <Image source={ IMAGES.SM_BACK_LOGO } style={{ width: '100%', height: '30%' }} />
                                <View style={{ width: '100%', paddingHorizontal: 20, textAlign: 'center' }}> 
                                    <View><Text style={{ color: '#1b1a1a', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 5, fontSize: 12, }} >Shopprix Mall, Major Dhyanchand Nagar,</Text></View>
                                    <View><Text style={{ color: '#1b1a1a', fontFamily: 'Montserrat', textAlign: 'center', paddingBottom: 5,fontSize: 12, }} >Opp. Dainik Jagran Office, Delhi Meerut Road,</Text></View>
                                    <View><Text style={{ color: '#1b1a1a', fontFamily: 'Montserrat', textAlign: 'center',paddingBottom: 5, fontSize: 12, }} >Meerut - 250002</Text></View>
                                </View>
                                <View>
                                    <Text style={{ color: '#1b1a1a', fontFamily: 'Montserrat', textAlign: 'center', fontSize: 18, }} >Mobile No. +91-8447100000</Text>
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Image source={ IMAGES.SM_BACK_LOGO} style={{ width: '100%', height: '30%' }} />
                                    <Text style={{ color: '#1b1a1a', fontFamily: 'Montserrat', textAlign: 'center', fontSize: 18, }} >Toll Free No. 18005322060</Text>
                                </View>
                            </View>
                           
                        </ImageBackground>

                    </View>



                </FlipCard>
            </View>
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.isCardListingSuccess !== prevProps.isCardListingSuccess) {
            console.log("Cards listing:: ", this.props.responseData)
            this.props.cardsListClearData()
        }
    }


    render() {
        const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

        if (this.props.isShowErrorAlert) {  
            Toast.show(this.props.error, Toast.LONG);
            this.props.cardsListClearData()
        }


        let cardList = this.props.responseData
        return (
            <View style={styles.container}>

                {/* <MyStatusBar backgroundColor="transparent" barStyle="light-content" /> */}

                <Spinner
                    visible={this.props.isLoadingData}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />

                <ImageBackground source={IMAGES.CARD_LISTING_BG} style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                    padding: 50
                }}>

                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={cardList}
                        renderItem={this._renderItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={SLIDER_WIDTH-18}
                        layout={'stack'}
                        containerCustomStyle={{ paddingTop: 70, }}
                        layoutCardOffset={12}
                        inactiveSlideOpacity={0.5}
                    // inactiveSlideScale={1}
                    />


                </ImageBackground>

            </View >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },


    backTextWhite: {
        color: 'transparent'
    },
    rowFront: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderBottomWidth: 50,

        alignItems: "center",
        width: '100%',
        //elevation: 10
        // paddingLeft: 10,
        // paddingRight:10


    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingLeft: 15,
        width: '100%'
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'transparent',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: '#0D0D0D',
        right: 0,
        width: '97%',
        height: 220,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 30
    },
    trash: {
        height: 36,
        width: 36,
        justifyContent: 'flex-end'
    },
    tick: {
        //  height: 25,
        //  width: 25,
    }

});


const mapDispatchToProps = dispatch => ({

    getAllCardLists: (authToken) => dispatch(getAllCardLists(authToken)),
    cardsListClearData: () => dispatch(cardsListClearData()),



});

const mapStateToProps = state => ({

    //Cards Objects
    processingCardsLosting: state.cards.processingCardsLosting,
    error: state.cards.error,
    responseData: state.cards.responseData,
    isShowErrorAlert: state.cards.isShowErrorAlert,
    isLoadingData: state.cards.isLoadingData,
    isCardListingSuccess: state.cards.isCardListingSuccess,

    //Auth Objects
    authToken: state.otpget.authToken,


});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);


