import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

ReactDOM.render(
    <>
        <ToastContainer/>
        <Router>
            <App/>
        </Router>
    </>,
    document.getElementById('root')
);
