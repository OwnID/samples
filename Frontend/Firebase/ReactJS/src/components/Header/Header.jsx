import '../../App.scss';
import './header.scss';
import React from "react";
import {useNavigate} from "react-router-dom";

function Header() {
    let navigate = useNavigate();
    return (
        <div className="header">
            <div className="logo" onClick={()=>navigate('/login')}>
                <img alt="logo" src="logo.svg"/>
            </div>
            <div className="links">
                <div><a href="https://console.ownid.com" className="header-nav-a"> Go to Console</a></div>
            </div>
        </div>
    );
}

export default Header;
