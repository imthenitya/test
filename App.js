
import React,{useEffect, useState} from 'react'
import {Pressable, Text,View} from 'react-native'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers'
import NativeApplication from './NativeApplication';
import './assets/i18n/i18n';
const store = configureStore({
  reducer: rootReducer
})

export default function App(route) {

  return (
    <Provider store={store}>
    <NativeApplication/>
    </Provider>
  );
}
  
