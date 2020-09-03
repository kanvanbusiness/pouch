import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CardsReducer from './CardsReducer';
import OTPAttemptReducer from './OTPAttemptReducer';



export default combineReducers({
    auth: AuthReducer,  
    cards: CardsReducer,
    otpget:OTPAttemptReducer
});
