import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  UPDATE_LOGIN_ERROR,
  LOGIN_USER_CLEARDATA,
  USER_INFO,
  RESET_REQUEST,
  UPDATE_USER_ERR_MSG,
  UPDATE_USER,
} from "./types";
import { checkNetwork } from "../utils";

import {
  makeAxiosRequest,
  makeFetchRequest,
  urlConstants,
  httpMethods,
} from "../api";

export async function doLogin(request) {
  console.warn(
    "doLogin calling+++++++++++++++++++++",
    urlConstants().LOGIN_URL
  );

  const headers = {
    platform: "ios",
  };

  return makeAxiosRequest(
    urlConstants().LOGIN_URL + "/" + request.username,
    httpMethods.POST,
    headers,
    {}
  );
}

export const loginUser = (request) => {
  console.log("Entered Phone Number--> " + request);
  return (dispatch) => {
    console.log("Login user is dispatched");
    console.log("Checking network");
    checkNetwork().then((state) => {
      console.warn("isConnect", state.isConnected);
      console.log("isNework connected --> " + state.isConnected);

      if (state.isConnected == true) {
        dispatch({ type: LOGIN_USER });
        doLogin(request)
          .then((response) => {
            // console.warn('Loginuser response is', loginUserResp);
            console.log("Loginuser loginUserStatus is", response.data);
            console.log("Loginuser loginUserStatus is", response.data.success);

            if (response.data.success == true) {
              loginRequestSuccess(dispatch, response.data, request.username);
            } else {
              // login user was not success
              loginRequestFailed(
                dispatch,
                "We apologize, a technical error has occurred."
              );
            }
          })
          .catch((error) => {
            console.log("API RESPONSE ERROR *******", JSON.stringify(error));
            loginRequestFailed(
              dispatch,
              "We apologize, a technical error has occurred."
            );
          });
      } else {
        loginRequestFailed(
          dispatch,
          "Your device is not connected to internet."
        );
      }
    });
  };
};

export const updateLoginErrorMsg = (errorMsg) => {
  return { type: UPDATE_LOGIN_ERROR, payload: errorMsg };
};

export const userSessionClearData = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_CLEARDATA,
      payload: "",
    });
  };
};

const loginRequestSuccess = (dispatch, payloadData, username) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { payloadData, username },
  });
};

const loginRequestFailed = (dispatch, error) => {
  console.log("Dispatching login user fail");
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

export const getUserInfo = (authToken) => {
  return (dispatch) => {
    const headers = {
      Authorization: "Bearer " + authToken,
    };

    makeAxiosRequest(urlConstants().USER, httpMethods.GET, headers, null)
      .then((res) => {
        if (res.status == 200) {
          dispatch({ type: USER_INFO, payload: res.data });
        } else {
          dispatch({ type: USER_INFO, payload: null });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateUserInfo = (authToken, data) => {
  console.log(authToken);
  console.log("Data ", data);
  return (dispatch) => {
    const headers = {
      Authorization: "Bearer " + authToken,
    };

    makeAxiosRequest(urlConstants().UPDATEPATH, httpMethods.PUT, headers, data)
      .then((res) => {
        console.log("Response ", res.data);
        if (res.data && res.data.success) {
          dispatch({ type: UPDATE_USER, payload: true });
        } else {
          dispatch({
            type: UPDATE_USER_ERR_MSG,
            payload: "We apologize, a technical error has occurred.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UPDATE_USER_ERR_MSG, payload: err.toString() });
      });
  };
};

export const resetUserRequest = () => {
  return (dispatch) => {
    dispatch({ type: RESET_REQUEST, payload: null });
  };
};
