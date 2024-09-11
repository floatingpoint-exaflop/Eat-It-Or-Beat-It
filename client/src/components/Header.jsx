import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import foodLogo from '../icons/logo.png';
import { useUserContext } from '../providers/UserProvider';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

export default function Header(props) {

    const { userData, setUserData } = useUserContext()


    const menu = [
        { id: 1, label: "Search", href: "/search" },
        { id: 2, label: "Profile", href: `/profile/${userData.id}` }
    ]


    function handleLogout() {
        setUserData({ id: null })
        window.location.assign('/')
    }

 return (
        <Navbar expand="md" bg="light" variant="light" className="p-3">
            <Container>
                {/* Logo */}
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <img src={foodLogo} alt="Food logo" style={{ width: 100 }} />
                </Navbar.Brand>

                {/* Site Name */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto d-flex justify-content-center align-items-center">
                        <h1 className="siteName">{props.sitename}</h1>
                    </Nav>

                    {/* User Menu */}
                    <Nav className="ms-auto d-flex flex-column flex-md-row align-items-center">
                        {userData.id !== null ? (
                            <>
                                {menu.map(item => (
                                    <Link
                                        key={item.id}
                                        to={item.href}
                                        className="nav-link btn btn-primary mx-md-2 mb-2 mb-md-0"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Button variant="primary" onClick={handleLogout} className="mx-md-2 mb-2 mb-md-0">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <p className="text-muted">Please login or signup to use our service!</p>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}