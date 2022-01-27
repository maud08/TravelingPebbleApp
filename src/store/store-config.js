import * as React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import sessionReducer from './sessionSlice';

export default configureStore({
    reducer: {
        session: sessionReducer
    },
    middleware: [
        thunkMiddleware
    ]
})