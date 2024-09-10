import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import foodLogo from '../icons/logo.png';
import { useUserContext } from '../providers/UserProvider';
import { Button } from 'react-bootstrap';

export default function Header(props) {

    const { userData, setUserData } = useUserContext()


    const menu = [
        { id: 1, label: "Search", href: "/" },
        { id: 2, label: "Profile", href: `/profile/${userData.id}` }
    ]


    function handleLogout() {
        setUserData({ id: null })
        window.location.assign('/')
    }

    return (
        <header className="container-fluid col-12" id="sitename-container">
            <div className="row">
                {/* possibly need to change the importing method */}
                <div className="col-2 logo-container" >
                    <img src={foodLogo} alt="Food logo" style={{ width: 100 }} />
                </div>


                <div className="col-6 d-flex justify-content-center align-items-center">
                    <h1 className="siteName">{props.sitename}</h1>

                </div>


                <div className="col-4 d-flex justify-content-end">
                    {userData.id !== null ? (
                        <div>
                            {menu.map(item => (
                                <ul className="nav d-flex justify-content-end row">
                                    <li className="nav-item" key={item.id}>

                                        <Link className="nav-link" to={item.href}>{item.label}</Link>
                                    </li>
                                </ul>
                            ))}
                            <ul className="nav d-flex justify-content-end row">
                                <li className='nav-item'>
                                    <Button variant="primary" onClick={handleLogout}>Logout</Button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        // Render different menu items for logged-out users
                        <p>Please login or signup to use our service!</p>
                    )}
                </div>
            </div>
        </header >
    );
}