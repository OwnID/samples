import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {OwnIDInit} from '@ownid/react';

ReactDOM.render(
    <>
        <ToastContainer/>
        <OwnIDInit config={{
            appId: '{app_id}',
        }}/>
        <Router>
            <App/>
        </Router>
    </>,
    document.getElementById('root')
);
