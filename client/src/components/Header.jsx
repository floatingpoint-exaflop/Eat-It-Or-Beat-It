import React from 'react';
import { Link } from 'react-router-dom';
import foodLogo from '../icons/food.svg';

export default function Header(props) {
    const menu = [
        { id: 1, label: "Search", href: "/" },
        { id: 2, label: "Profile", href: "/" },
        { id: 3, label: "Logout", href: "/" },
    ];

    return (
        <header className="container-fluid">
            <div className="row">
                {/* possibly need to change the importing method */}
                <div className="col-1">
                    <img src={foodLogo} alt="Food logo" />
                </div>
                <div className="col-4">
                    <h1>{props.sitename}</h1>
                </div>
                <div className="col-7">
                    <ul className="nav">
                        {props.loggedInUser && props.loggedInUser.length > 1 ? (
                            menu.map(item => (
                                <li className="nav-item" key={item.id}>
                                    <Link className="nav-link" to={item.href}>{item.label}</Link>
                                </li>
                            ))
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}