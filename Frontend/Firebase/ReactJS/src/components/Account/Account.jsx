import './Account.scss';
import React from "react";
import Header from "../Header/Header";
import {getAuth, signOut} from 'firebase/auth';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


function Account() {
    let navigate = useNavigate();
    function logout() {
        signOut(getAuth())
            .then(() => navigate('../login'))
            .catch(err => toast(err))
    }

    return (
        <>
            <Header/>
            <div className="account-details">
                <div className="text">
                    You are logged in
                </div>
                <div className="custom-link">
                    <div onClick={logout} className="link-text">Logout</div>
                </div>
            </div>
        </>
    );
}

export default Account;
