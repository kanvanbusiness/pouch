import {
  
 CARDSLISTING ,
 CARDSLISTING_SUCCESS ,
 CARDSLISTING_FAILED ,
 CARDSLISTING_ERROR ,
 CARDSLISTING_CLEARDATA,
 CARD_TEMPLATES
} from './types';
import { checkNetwork } from '../utils';

import { makeAxiosRequest, makeFetchRequest, urlConstants, httpMethods } from '../api';





export async function doGetAllCards(authToken) {

    console.warn("doGetAllCards calling+++++++++++++++++++++", urlConstants().CARDS_LIST_URL);

    const headers = {
        'Authorization': "Bearer " + authToken,
    }

    return makeAxiosRequest(urlConstants().CARDS_LIST_URL, httpMethods.GET, headers, null)

};



export const getAllCardLists = (authToken) => {
    console.log('getAllCardLists--> ' + authToken);

    return (dispatch) => {

        console.log('Checking network');
        checkNetwork()
            .then(state => {
                console.warn("isConnect", state.isConnected)
                console.log('isNework connected --> ' + state.isConnected);

                if (state.isConnected == true) {
                    dispatch({ type: CARDSLISTING });
                    doGetAllCards(authToken)
                        .then(response => {
                            // console.warn('Loginuser response is', loginUserResp);
                            // console.log('Categories Data is', response);
                            console.log('Categories Data Status is', response.status);

                            if (response.status == 200) {
                                // console.log('Response Data', response.data)
                                cardsRequestSuccess(dispatch, response.data);

                            } else {
                                // login user was not success
                                cardsRequestFailed(dispatch, 'We apologize, a technical error has occurred.')
                            }
                        })
                        .catch(error => {
                            console.log('API RESPONSE ERROR *******',
                                JSON.stringify(error));
                            cardsRequestFailed(dispatch, 'We apologize, a technical error has occurred.')
                        })
                } else {
                    cardsRequestFailed(dispatch, 'Your device is not connected to internet.')
                }


            })
    }

};

export const getCardTemplates = (authToken) => {
    return (dispatch) => {
      const headers = {
        Authorization: "Bearer " + authToken,
      };
  
      makeAxiosRequest(urlConstants().CARDS_TEMPLATES, httpMethods.GET, headers, null)
        .then((res) => {
          if (res.status == 200) {
            dispatch({ type: CARD_TEMPLATES, payload: res.data });
          } else {
            dispatch({ type: CARD_TEMPLATES, payload: [] });
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch({ type: CARD_TEMPLATES, payload: [] });
        });
    };
  };


const cardsRequestSuccess = (dispatch, categoryData) => {
    dispatch({
        type: CARDSLISTING_SUCCESS,
        payload: categoryData
    });
};

const cardsRequestFailed = (dispatch, error) => {
    dispatch({ type: CARDSLISTING_FAILED, payload: error });
};

export const cardsListClearData = () => {
    return (dispatch) => {
        dispatch({
            type: CARDSLISTING_CLEARDATA,
            payload: ""
        });
    }

}

