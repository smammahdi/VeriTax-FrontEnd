import '../css/profile.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { CSSTransition } from 'react-transition-group';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { ReactComponent as ProfileIcon } from '../icons/profile.svg';
import { ReactComponent as SettingsIcon } from '../icons/settings.svg';
import { ReactComponent as LogoutIcon } from '../icons/logout.svg';
import { ReactComponent as ProfileItemIcon } from '../icons/profile-item.svg';


function Profile() {


    return (
        <div className="profile">
            <ProfileItem icon={<ProfileIcon />} >
                <DropdownMenu />
            </ProfileItem>
        </div>
    )
}

function ProfileItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <div className='right-container'>
        <li className="profile-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
        </div>
    )
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    const logout = async () => {
        setAuth({});
        // navigate('/login');
        console.log("logout successful");
    }

    return (
        <div className="dropdown">
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary">
                <div className="menu">
                    <Link to="/profileupdate">
                    <DropdownItem
                        leftIcon={<ProfileItemIcon />}>My Profile</DropdownItem>
                    </Link>
                    {/* <DropdownItem
                        leftIcon={<SettingsIcon />}> Settings
                    </DropdownItem> */}
                    <Link onClick={logout} to="/login">
                    <DropdownItem 
                        leftIcon={<LogoutIcon />}> 
                        Log Out
                    </DropdownItem>
                    </Link>
                </div>
            </CSSTransition>

        </div>
    )
}

export default Profile;