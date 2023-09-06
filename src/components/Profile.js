import '../css/profile.css';
import React from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

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
        <li className="profile-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    )
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    return (
        <div className="dropdown">
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary">
                <div className="menu">
                <DropdownItem leftIcon={<ProfileItemIcon />}>
                    My Profile</DropdownItem>
                <DropdownItem 
                    leftIcon={<SettingsIcon />}> Settings
                </DropdownItem>
                <DropdownItem 
                    leftIcon={<LogoutIcon />}> Log Out
                </DropdownItem>
                </div>
            </CSSTransition>

        </div>
    )
}

export default Profile;