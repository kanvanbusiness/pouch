import React, { Component, useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    ImageBackground,
    Image,
    TextInput,
    Dimensions, 
    ScrollView,
    Platform
} from 'react-native';
import { Button } from '../components/common'
import { IMAGES } from '../utils/ImageUtils'
import { connect } from 'react-redux';
import {
    loginUser,
    userSessionClearData
} from '../actions'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

class Login extends Component {



    constructor(props) {
        super(props);
        this.state = {
            phonenumber: '',
            isEnableContinue: false
        }

    }

    _onPressContinue() {
       

       var integerNumber = parseInt(this.state.phonenumber);

       let request = {
           'username': integerNumber
       }
       this.props.loginUser(request)

    }

    onPhoneNumberChanged = (text) => {
        this.setState({
            ...this.state, phonenumber: text, isEnableContinue: text.length == 10?true:false
        }, function () {
            //this._buttonEnable();
        })
    }

    componentDidUpdate(prevProps){

        if (this.props.isLoginSuccess !== prevProps.isLoginSuccess) {
            this.props.navigation.navigate('OTPVerification',{userPhoneNumber:this.props.phoneNumber})
            this.props.userSessionClearData()
        }

    }


    render() {
         console.log(" this.props.isShowErrorAlert:", this.props.isShowErrorAlert)
         console.log(" this.props.error:", this.props.error)
         console.log(" this.props.phoneNumber:", this.props.phoneNumber)



        if (this.props.isShowErrorAlert) {  
            Toast.show(this.props.error, Toast.LONG);
            this.props.userSessionClearData()
        }


        return (
            
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>

<Spinner
          visible={this.props.isLoadingData}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />

                <ImageBackground source={IMAGES.BACKGROUND2} style={{
                    width: '100%',
                    flex: 1,
                }}>



<KeyboardAwareScrollView style={{flex:1}}>


                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>

                        <View style={{ height:150, width: '100%', backgroundColor: 'transparent', 
                        flexDirection: 'column', justifyContent: 'center', 
                        alignItems: 'center', marginTop: Platform.OS == 'android'?25: 50, marginBottom:50 }}>

                            <View style={{
                                width: '100%',
                                height: 40,
                                marginTop: 0,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: 'transparent'

                            }}>
                                <Text style={{
                                    fontWeight: "500",
                                    fontSize: 24,
                                    color: '#1b1a1a',
                                    fontFamily: 'Montserrat'
                                }}>
                                    Welcome To
                            </Text>
                                <Text style={{
                                    fontWeight: "500",
                                    color: '#db9435',
                                    fontSize: 24,
                                    marginLeft: 5,
                                    fontFamily: 'Montserrat'
                                }}>
                                    Pouch
                            </Text>

                            </View>

                            <Image source={IMAGES.LOGO2} style={{ width: 57, height: 88, marginTop: 16 }}></Image>

                        </View>
                        <View style={{
                            height:420, width: '100%', backgroundColor: 'transparent',
                            flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',

                        }}>

                            <View style={{
                                width: '95%', height: 380,
                                flexDirection: 'column-reverse', justifyContent: 'flex-start', alignItems: 'center',
                                backgroundColor: 'transparent', borderRadius: 60, 
                                shadowColor: '#000000',
                                shadowOffset: { height: 10, width: 10 },
                                shadowOpacity: 0.5, elevation: 5,
                                marginTop:10
                               

                            }}>
                                <Image source={IMAGES.BACKGROUND1} style={{ width: '100%', flex: 1, borderRadius: 60 }}></Image>
                                <View style={{
                                    width: '100%', height: '100%', flexDirection: 'column', backgroundColor: 'transparent', position: 'absolute',
                                    justifyContent: 'flex-start', alignItems: 'center',
                                }}>
                                    <Text style={{
                                        fontWeight: "700",
                                        fontSize: 22,
                                        color: 'white',
                                        fontFamily: 'Montserrat',
                                        marginTop: 50,
                                        textAlign: 'center'


                                    }}>
                                        GETTING STARTED
                            </Text>

                                    <Text style={{
                                        fontWeight: "600",
                                        fontSize: 22,
                                        color: '#db9435',
                                        fontFamily: 'Montserrat',
                                        marginTop: 39,
                                        textAlign: 'center',
                                        marginLeft:5,
                                        marginRight:5,

                                        }}>
                                        GIVE YOUR PHONE NUMBER
                            </Text>

                                    <Text style={{
                                        marginLeft:30,
                                        marginRight:30,
                                        fontWeight: "200",
                                        fontSize: 18,
                                        color: 'white',
                                        fontFamily: 'Montserrat',
                                        marginTop: 20,
                                        marginBottom:50,
                                        textAlign: 'center'
                                    }}>
                                        This is to fetch the details of your all credit card(s)   
                                        
                                        
                                                                 </Text>

                                                                 <View style={{width:'100%', height:50, flexDirection:'column', 
                                                                 backgroundColor:'transparent', marginBottom:50,
                                                                 
                                                                 marginLeft:20, marginRight:20,
                                                                 justifyContent:'center',
                                                                 alignItems:'center',
                                                                 paddingLeft:30,
                                                                 paddingRight:30
                                                            
                                                                 
                                                                 }}>
                                                                 {/* <Text style={{
                                        fontSize: 18,
                                        color: 'white',
                                        fontFamily: 'Montserrat',
                                        marginTop:0 ,
                                        textAlign: 'center',
                                        marginLeft:0,
                                        marginRight:8,
                                        fontWeight: "600"

                                        }}>
                                        +91
                            </Text> */}

                            <TextInput
          value={this.state.phonenumber}
          onChangeText={this.onPhoneNumberChanged}
          placeholder = "Enter Phone Number" 
        placeholderTextColor = "white"
        keyboardType='number-pad'
        maxLength={10}
        selectionColor='white'
        color='white'
          style={{ width:'90%', height: 50,borderBottomWidth: 1,borderColor: 'white', fontSize:24,fontFamily: 'Montserrat',fontWeight: "600", textAlign:'center' }}
        />

                                                                 </View>




            
                                                                 

                                </View>





                            </View>

                        </View>

                        <View style={{
                            height:60, width: '100%', backgroundColor: 'transparent',
                            flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
                            marginBottom:20
                        }}>

                            <Button
                                onPress={() => {
                                    this._onPressContinue();
                                }}
                                children={'CONTINUE'}
                                isEnable={this.state.isEnableContinue}
                                customButtonStyle={{
                                    width: 202,
                                    marginTop: 20,
                                    height: 55,
                                    justifyContent: 'center',
                                    backgroundColor: this.state.isEnableContinue == true?'#db9435':'transparent',
                                    borderRadius: 50,
                                    borderColor: '#db9435',
                                    borderWidth: 2

                                }}
                                customTextStyle={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontWeight: "700",
                                    fontSize: 18,
                                    fontFamily: 'Montserrat'
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



const mapDispatchToProps = dispatch => ({

    loginUser: (request) => dispatch(loginUser(request)),
    userSessionClearData: () => dispatch(userSessionClearData()),

    
  
  });
  
  const mapStateToProps = state => ({
   
    processingLogin: state.auth.processingLogin,
    loadingMessage: state.auth.loadingMessage,
    error: state.auth.error,
    responseData: state.auth.responseData,
    isShowErrorAlert: state.auth.isShowErrorAlert,
    isLoadingData: state.auth.isLoadingData,
    isLoginSuccess: state.auth.isLoginSuccess,
    phoneNumber: state.auth.phoneNumber,

    
  
  });
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);
  
  



