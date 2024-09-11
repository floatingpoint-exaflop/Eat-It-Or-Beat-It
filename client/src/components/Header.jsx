import React from 'react';
import { Link } from 'react-router-dom';
import foodLogo from '../icons/logo.png';
import { useUserContext } from '../providers/UserProvider';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

export default function Header(props) {
    const { userData, setUserData } = useUserContext();

    const menu = [
        { id: 1, label: "Search", href: "/search" },
        { id: 2, label: "Profile", href: `/profile/${userData.id}` }
    ];

    function handleLogout() {
        setUserData({ id: null });
        window.location.assign('/');
    }

    return (
        <Navbar expand="md" style={{ backgroundColor: 'crimson' }} variant="dark" className="p-3">
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
                    <Nav className="ms-auto d-flex align-items-center">
                        {userData.id !== null ? (
                            <>
                                {menu.map(item => (
                                    <Link
                                        key={item.id}
                                        to={item.href}
                                        className="nav-link btn btn-primary mx-md-2"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Button variant="primary" onClick={handleLogout} className="mx-md-2">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <p className="headerp">Please login or signup to use our service!</p>
                          // <Button variant="primary" onClick={handleLogout} id="logBackIn">Login</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
