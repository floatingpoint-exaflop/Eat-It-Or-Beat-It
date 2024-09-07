import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function LoginForm({ validateUsernameAndPassword }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/profile/:userId'); 
  }

  function handleLogin() {
    // Validate the username and password
    const validationError = validateUsernameAndPassword(username, password);

    if (validationError) {
      console.log("Validation Error:", validationError);
      return;
    }

    // Proceed with authentication if validation passes
    if (username === "validUsername" && password === "validPassword") {
      setIsAuthenticated(true);
      navigate('/profile/:userId'); // Replace with your desired route
      console.log("Login successful!");
    } else {
      console.log("Invalid username or password. Please try again.");
    }
  }

  return (
    <div className="container-fluid col-6">
      <h3>Login</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
      </Form>
    </div>
  );
}

LoginForm.propTypes = {
    validateUsernameAndPassword: PropTypes.func,
  };