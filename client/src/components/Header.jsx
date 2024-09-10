import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import foodLogo from '../icons/logo.png';

export default function Header(props) {
    const loginNavItems = [
        { id: 1, label: "Search", href: "/" },
        { id: 2, label: "Profile", href: "/profile" },
        { id: 3, label: "Logout", href: "/" },

    ];

    const logoutNavItems = [
        { id: 4, label: "Login", href: '/login' }
    ]

    return (
        <header className="container-fluid col-12">
            <div className="row">
                {/* possibly need to change the importing method */}
                <div className="col-2 logo-container" >
                    <img src={foodLogo} alt="Food logo" style={{ width: 100 }} />
                </div>
                <div className="col-3">
                    <h1 className="siteName text-center">{props.sitename}</h1>
                </div>
                <div className="col-7 d-flex justify-content-end">
                        {props.loggedInUser && props.loggedInUser.length > 1 ? (
                            loginNavItems.map(item => (
                         <ul className="nav d-flex justify-content-end row">
                                <li className="nav-item" key={item.id}>
                                    <Link className="nav-link" to={item.href}>{item.label}</Link>
                                </li>
                            </ul>
                            ))
                        ) : (
                            // Render different menu items for logged-out users
                            logoutNavItems.map(item => (
                                <ul className="nav" key={item.id}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={item.href}>{item.label}</Link>
                                    </li>
                                </ul>
                            ))
                        )}
                </div>
            </div>
        </header >
    );
}