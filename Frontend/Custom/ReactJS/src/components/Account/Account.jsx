import './Account.scss';
import React from "react";
import Header from "../Header/Header";
import {useNavigate} from "react-router-dom";

function Account() {
    let navigate = useNavigate();
    return (
        <>
            <Header/>
            <div className="account-details">
                <div className="text">
                    You are logged in
                </div>
                <div className="custom-link">
                    <div onClick={() => navigate('../login')} className="link-text">Logout</div>
                </div>
            </div>
        </>
    );
}

export default Account;
