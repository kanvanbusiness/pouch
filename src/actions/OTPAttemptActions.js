import {
   

    LOGIN_USER_ATTEMPT,
    LOGIN_USER_ATTEMPT_SUCCESS,
    LOGIN_USER_ATTEMPT_FAILED,
    LOGIN_USER_ATTEMPT_CLEARDATA,


    CATEGORIES,
    CATEGORIES_SUCCESS,
    CATEGORIES_FAILED,
    CATEGORIES_ERROR,
    CATEGORIES_CLEARDATA,
    CATEGORIES_SWITCH
} from './types';
import { checkNetwork } from '../utils';

import { makeAxiosRequest, makeFetchRequest, urlConstants, httpMethods } from '../api';

export async function doLoginAttempt(request) {

    console.warn("doLogin calling+++++++++++++++++++++", urlConstants().LOGIN_ATTEMPT_URL);

    const headers = {
        'platform': 'IOS',
    }

    return makeAxiosRequest(urlConstants().LOGIN_ATTEMPT_URL, httpMethods.POST, headers, request)

};

export async function doGetAllCategories(authToken) {

    console.warn("doGetAllCategories calling+++++++++++++++++++++", urlConstants().CARDS_CATEGORY_URL);

    const headers = {
        'Authorization': "Bearer "+ authToken,
    }

    return makeAxiosRequest(urlConstants().CARDS_CATEGORY_URL, httpMethods.GET, headers, null)

};

export const loginUserAttempt = (request) => {
    console.log('Entered Phone Number--> ' + request);
    return (dispatch) => {

        console.log('Login user is dispatched');
        console.log('Checking network');
        checkNetwork()
            .then(state => {
                console.warn("isConnect", state.isConnected)
                console.log('isNework connected --> ' + state.isConnected);

                if (state.isConnected == true) {
                    dispatch({ type: LOGIN_USER_ATTEMPT });
                    doLoginAttempt(request)
                        .then(response => {
                            // console.warn('Loginuser response is', loginUserResp);
                            console.log('loginUserAttempt loginUserStatus data is:::', response.data);
                            console.log('loginUserAttempt loginUserStatus is', response.data.success);

                            if (response.data.success == true) {

                                loginAttemptRequestSuccess(dispatch, response.data.response);


                            } else {
                                // login user was not success
                                loginAttemptRequestFailed(dispatch, 'We apologize, a technical error has occurred.')
                            }
                        })
                        .catch(error => {
                           // console.log('API RESPONSE ERROR *******',JSON.stringify(error));

                            loginAttemptRequestFailed(dispatch, 'We apologize, a technical error has occurred.')

                        })
                } else {
                    loginAttemptRequestFailed(dispatch, 'Your device is not connected to internet.')
                }


            })
    };
};

const getAllCardCategories = (dispatch,authToken) => {
    console.log('getAllCardCategories--> ' + authToken);

        console.log('Checking network');
        checkNetwork()
            .then(state => {
                console.warn("isConnect", state.isConnected)
                console.log('isNework connected --> ' + state.isConnected);

                if (state.isConnected == true) {
                    dispatch({ type: CATEGORIES });
                    doGetAllCategories(authToken)
                        .then(response => {
                            // console.warn('Loginuser response is', loginUserResp);
                            console.log('Categories Data is', response);
                            console.log('Categories Data Status is', response.status);

                            if (response.status == 200) {

                                categoryRequestSuccess(dispatch, response.data);

                            } else {
                                // login user was not success
                                categoryRequestFailed(dispatch, 'We apologize, a technical error has occurred.')
                            }
                        })
                        .catch(error => {
                            console.log('API RESPONSE ERROR *******',
                                JSON.stringify(error));
                            categoryRequestFailed(dispatch, 'We apologize, a technical error has occurred.')
                        })
                } else {
                    categoryRequestFailed(dispatch, 'Your device is not connected to internet.')
                }


            })
    
};

export const userLoginAttemptSessionClearData = () => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER_ATTEMPT_CLEARDATA,
            payload: ""
        });
    }

}

const loginAttemptRequestSuccess = (dispatch, userAuthToken) => {

    getAllCardCategories(dispatch,userAuthToken)

    dispatch({
        type: LOGIN_USER_ATTEMPT_SUCCESS,
        payload: { userAuthToken }
    });
};


const loginAttemptRequestFailed = (dispatch, error) => {
    console.log('Dispatching login user fail');
    dispatch({ type: LOGIN_USER_ATTEMPT_FAILED, payload: error });
};

const categoryRequestSuccess = (dispatch, categoryData) => {
    dispatch({
        type: CATEGORIES_SUCCESS,
        payload: categoryData 
    });
};

const categoryRequestFailed = (dispatch, error) => {
    dispatch({ type: CATEGORIES_FAILED, payload: error });
};

export const categoriesClearData = () => {
    return (dispatch) => {
        dispatch({
            type: CATEGORIES_CLEARDATA,
            payload: ""
        });
    }

}

export const switchCategory = (catData) => {
    return (dispatch) => {
        dispatch({ type: CATEGORIES_SWITCH, payload: catData});
    };
};

export const clearSwitchCategory = () => {
    return (dispatch) => {
        dispatch({ type: CATEGORIES_SWITCH, payload: null});
    };
};