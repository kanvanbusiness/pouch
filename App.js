/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import { SafeAreaView, StyleSheet, LogBox } from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { YellowBox } from "react-native";

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import RootNavigator from "./src/config/Routes";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-community/async-storage";
import DeviceInfo from "react-native-device-info";
import reducers from "./src/reducers";

const App = () => {
  LogBox.ignoreAllLogs(true);
  // YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
  // console.ignoredYellowBox = ['Warning: ReactNative.createElement'];
  // console.disableYellowBox = true;
  //console.warn("call render method")
  const persistConfig = {
    key: "root",
    keyPrefix: "",
    storage: AsyncStorage,
    transform: ["31231313131312312312312"],
    whitelist: ["auth", "cards", "otpget"],
  };

  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(persistConfig, reducers);

  let store = createStore(
    persistedReducer,
    {},
    applyMiddleware(ReduxThunk, sagaMiddleware)
  );
  let persistor = persistStore(store);

  return (
    // <RootNavigator />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;
