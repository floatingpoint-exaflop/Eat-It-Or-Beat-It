import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import foodLogo from '../icons/logo.png';

import { useUserCtx } from '../providers/UserProvider';

export default function Header(props) {

    const { userData, setUserData } = useUserCtx()

    const menu = [
        { id: 1, label: "Search", href: "/" },
        { id: 2, label: "Profile", href: `/profile/${userData.id}` }
    ];

    function handleLogout() {
        setUserData({ id: null });
        window.location.assign("/")
    }

    return (
        <header className="container-fluid">
            <div className="row">
                {/* possibly need to change the importing method */}
                <div className="col-2 logo-container" >
                    <img src={foodLogo} alt="Food logo" style={{ width: 100 }} />
                </div>
                <div className="col-3">
                    <h1 className="siteName">{props.sitename}</h1>
                </div>
                <div className="col-7">
                    <ul className="nav">
                        {userData.id !== null ? (
                            <>
                                {menu.map(item => (
                                    <li className="nav-item" key={item.id}>
                                        <Link className="nav-link" to={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                                <li className='nav-item'>
                                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>not logged in</>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}