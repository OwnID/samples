import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {OwnIDInit} from '@ownid/react';
import {initializeApp} from 'firebase/app';
import {getAuth, getIdToken, signInWithCustomToken} from "firebase/auth";
const firebaseConfig = {
    //Firebase config goes here
};
initializeApp(firebaseConfig);
ReactDOM.render(
    <>
        <ToastContainer/>
        <OwnIDInit config={{
            appId: '{app_id}',
            sdk: 'firebase',
            firebaseAuth: {
                getAuth,
                getIdToken,
                signInWithCustomToken
            }
        }}/>
        <Router>
            <App/>
        </Router>
    </>,
    document.getElementById('root')
);
