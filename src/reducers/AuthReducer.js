import {
    LOGIN_USER, LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL, PROCESS_LOGIN,
    UPDATE_LOGIN_ERROR,
    LOGIN_USER_CLEARDATA, USER_INFO, RESET_REQUEST, UPDATE_USER, UPDATE_USER_ERR_MSG

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

    user_info: null,
    update_user: false,
    update_user_err_msg: null

};

export default (state = INITIAL_STATE, action) => {
    //console.log("*******LOGIN_USER_SUCCESS+++++++++++++", action.payload)
    //console.log("*******LOGIN_USER_SUCCESS+++++++++++++", action.type)
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                processingLogin: true,
                loadingMessage: '',
                error: '',
                isShowErrorAlert: false,
                isLoadingData: true,
                isLoginSuccess: false,
                phoneNumber: '',
            };

        case LOGIN_USER_SUCCESS:

            return {
                ...state, processingLogin: false,
                error: '',
                responseData: action.payload.payloadData,
                isShowErrorAlert: false,
                isLoadingData: false,
                isLoginSuccess: true,
                phoneNumber: action.payload.username,

            };


        case LOGIN_USER_FAIL:
            return {
                ...state,
                processingLogin: false,
                error: action.payload,
                isShowErrorAlert: true,
                isLoadingData: false,
                isLoginSuccess: false,
                phoneNumber: '',

            };

        case LOGIN_USER_CLEARDATA:
            return {
                ...state,
                isShowErrorAlert: false,
                processingLogin: false,
                loadingMessage: '',
                error: '',
                isLoadingData: false,
                isLoginSuccess: false,

            };
        
        case USER_INFO:
            return {
                ...state,
                user_info: action.payload
            }

        case UPDATE_USER:
            return {
                ...state,
                update_user: true,
                update_user_err_msg: null
            }

        case UPDATE_USER_ERR_MSG:
            return {
                ...state,
                update_user_err_msg: action.payload,
                update_user: false
            }

        case RESET_REQUEST:
            return {
                ...state,
                update_user: false,
                update_user_err_msg: null
            }

        default:
            return state;
    }
};