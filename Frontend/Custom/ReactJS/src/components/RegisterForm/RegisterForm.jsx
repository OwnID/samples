import React, {useRef, useState} from "react";
import './registerForm.scss';
import 'react-toastify/dist/ReactToastify.css';
import {OwnID} from "@ownid/react";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {httpPostRequest, loginUser, registerUser} from "../../services/httpRequests";
import {toast} from "react-toastify";

function RegisterComponent() {
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const [ownIDData, setOwnIDData] = useState(null);
    let navigate = useNavigate();

    // Stores ownIdData
    function onRegister(ownIdData) {
        setOwnIDData(ownIdData);
    }

    function onSubmit(event,userData1) {
        event.preventDefault();
        //Call your existing registration logic in the backend
        const userData = {loginId: emailField.current.value, password: passwordField.current.value};
        return register({...userData, ...{ownIdData: ownIDData}});
    }

    function register(userData) {

        registerUser(userData)
            .then(data => {
                if (data.created) {
                    navigate('/login')
                } else {
                    toast.error(data.error);
                }
            })
            .catch(error => toast.error(error))
    }

    return (
        <>
            <Header/>
            <div className="nav-tabs">
                <a className="nav-link active">Register</a>
            </div>
            <form onSubmit={onSubmit} className="login-form">
                <input ref={emailField} type="email" name="email" placeholder="Email" required/>
                <input ref={passwordField} type="password" name="password" placeholder="password" required/>
                <button type="submit">Register</button>
                <OwnID type='register'
                       loginIdField={emailField}
                       passwordField={passwordField}
                       onError={(error) => console.error(error)}
                       onRegister={onRegister}/>
            </form>
            <div className="custom-link" onClick={() => navigate('/login')}>
                <div className="link-text">Already have an account?</div>
            </div>
        </>
    );
}

export default RegisterComponent;
