import React, {useRef} from "react";
import './registerForm.scss';
import 'react-toastify/dist/ReactToastify.css';
import { OwnID, ownidReactService } from "@ownid/react";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import {toast} from "react-toastify";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

function RegisterComponent() {
    const email = useRef(null);
    const password = useRef(null);
    let navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(getAuth(), email.current.value, password.current.value)
            .then(async () => {
                //Enroll device with OwnID
                await ownidReactService.enrollDevice();
                navigate('/login')
            })
            .catch(err => toast.error(err))
    }

    return (
        <>
            <Header/>
            <div className="nav-tabs">
                <a className="nav-link active">Register</a>
            </div>
            <form onSubmit={onSubmit} className="login-form">
                <input ref={email} type="email" name="email" placeholder="Email" required/>
                <input ref={password} type="password" name="password" placeholder="password" required/>
                <button type="submit">Register</button>
                <OwnID type='register'
                       variant='button-fingerprint'
                       infoTooltip={true}
                       loginIdField={email}
                       passwordField={password}
                       onError={(error) => console.error(error)}/>
            </form>
            <div className="custom-link" onClick={() => navigate('/login')}>
                <div className="link-text">Already have an account?</div>
            </div>
        </>
    );
}

export default RegisterComponent;
