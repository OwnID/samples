import React, {useRef} from "react";
import './loginForm.scss';
import {OwnID} from "@ownid/react";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {toast} from "react-toastify";
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';

function LoginForm() {
    const email = useRef(null);
    const password = useRef(null);
    let navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(getAuth(), email.current.value, password.current.value)
            .then(() => navigate('/account'))
            .catch(err => toast.error(err))
    }

    function onLogin() {
        //redirecting user to the account page
        navigate('/account')
    }

    return (
        <>
            <Header/>
            <div className="nav-tabs">
                <a className="nav-link active">Login</a>
            </div>
            <form className="login-form" onSubmit={onSubmit}>
                <input ref={email} type="email" name="email" placeholder="Email" required/>
                <input ref={password} type="password" name="password" placeholder="password" required/>
                <button type="submit">Log In</button>
                <OwnID type='login'
                       variant='button-fingerprint'
                       infoTooltip={true}
                       passwordField={password}
                       loginIdField={email}
                       onError={(error) => console.error(error)}
                       onLogin={onLogin}/>
            </form>
            <div className="custom-link" onClick={() => navigate('/register')}>
                <div className="link-text">Don't have an account?</div>
            </div>
        </>
    );
}

export default LoginForm;
