import {
   
    CARDSLISTING ,
    CARDSLISTING_SUCCESS ,
    CARDSLISTING_FAILED ,
    CARDSLISTING_ERROR ,
    CARDSLISTING_CLEARDATA,
    CARD_TEMPLATES
} from '../actions/types';

const INITIAL_STATE = {
    processingCardsLosting: false,
    error: '',
    responseData: [],
    isShowErrorAlert: false,
    isLoadingData: false,
    isCardListingSuccess: false,
    card_templates: []
};

export default (state = INITIAL_STATE, action) => {
   // console.log("*******CARDS LISTING+++++++++++++", action.payload)
  //  console.log("*******CARDS LISTING+++++++++++++", action.type)
    switch (action.type) {
        case CARDSLISTING:
            return {
                ...state,
                processingCardsLosting: true,
                error: '',
                isShowErrorAlert: false,
                isLoadingData: true,
                isCardListingSuccess: false,
              
            };

        case CARDSLISTING_SUCCESS:

            return {
                ...state, 
                processingCardsLosting: false,
                responseData: action.payload,
                error: '',
                isShowErrorAlert: false,
                isLoadingData: false,
                isCardListingSuccess: true,

            };

    
            case CARDSLISTING_FAILED:

            return {
                ...state,
                processingCardsLosting: false,
                error: action.payload,
                isShowErrorAlert: true,
                isLoadingData: false,
                isCardListingSuccess: false,

            };

            case CARD_TEMPLATES:

            return {
                ...state,
                card_templates: action.payload
            };

       

        case CARDSLISTING_CLEARDATA:
            return {
                ...state,
                isShowErrorAlert: false,
                processingCardsLosting: false,
                error: '',
                isLoadingData: false,
                isCardListingSuccess: false
                // responseData: []
            };

        default:
            return state;
    }
};