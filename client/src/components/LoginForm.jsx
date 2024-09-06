import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("Username:", username);
    console.log("Password:", password);
    // Add logic to handle login with username and password
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