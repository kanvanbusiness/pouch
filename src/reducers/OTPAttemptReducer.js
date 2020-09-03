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





} from '../actions/types';

const INITIAL_STATE = {
    processingLogin: false,
    loadingMessage: '',
    error: '',
    responseData: {},
    isShowErrorAlert: false,
    isLoadingData: false,
    isLoginSuccess: false,
    phoneNumber: '',
    authToken: '',
    isLoginAttemtSuccess: false,

    isCategoryDataGetSuccess: false,
    categoryResponseData: [],
    categoryID:''





};

export default (state = INITIAL_STATE, action) => {
  //  console.log("*******LOGIN_USER_SUCCESS+++++++++++++", action.payload)
  //  console.log("*******LOGIN_USER_SUCCESS+++++++++++++", action.type)
    switch (action.type) {
        case LOGIN_USER_ATTEMPT:
            return {
                ...state,
                processingLogin: true,
                loadingMessage: '',
                error: '',
                isShowErrorAlert: false,
                isLoadingData: true,
                isLoginSuccess: false,
                phoneNumber: '',
                isLoginAttemtSuccess: false
            };

        case LOGIN_USER_ATTEMPT_SUCCESS:

            return {
                ...state, processingLogin: false,
                error: '',
                authToken: action.payload.userAuthToken,
                isShowErrorAlert: false,
                isLoadingData: false,
                isLoginSuccess: false,
                isLoginAttemtSuccess: true

            };


            case LOGIN_USER_ATTEMPT_FAILED:

            return {
                ...state,
                processingLogin: false,
                error: action.payload,
                isShowErrorAlert: true,
                isLoadingData: false,
                isLoginSuccess: false,
                isLoginAttemtSuccess: false

            };

        

        case LOGIN_USER_ATTEMPT_CLEARDATA:
            return {
                ...state,
                isShowErrorAlert: false,
                processingLogin: false,
                loadingMessage: '',
                error: '',
                isLoadingData: false,
                isLoginSuccess: false,
                isLoginAttemtSuccess: false

            };



        case CATEGORIES:
            return {
                ...state,
                error: '',
                isShowErrorAlert: false,
                isLoadingData: true,
                isCategoryDataGetSuccess:false
            };

        case CATEGORIES_SUCCESS:

            return {
                ...state,
                error: '',
                categoryResponseData: action.payload,
                isShowErrorAlert: false,
                isLoadingData: false,
                isCategoryDataGetSuccess:true

            };


        case CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload,
                isShowErrorAlert: true,
                isLoadingData: false,
                isCategoryDataGetSuccess: false

            };

        case CATEGORIES_ERROR:
            return {
                ...state,
                error: action.payload,
                isShowErrorAlert: true,
                isLoadingData: false,
                isCategoryDataGetSuccess: false

            };

        case CATEGORIES_CLEARDATA:
            return {
                ...state,
                isShowErrorAlert: false,
                processingLogin: false,
                error: '',
                isLoadingData: false,
                isCategoryDataGetSuccess: false

            };

            case CATEGORIES_SWITCH:
                return {
                    ...state,
                    categoryID: action.payload
    
                };

        default:
            return state;
    }
};