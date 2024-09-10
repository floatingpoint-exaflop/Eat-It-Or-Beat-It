import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Form, Button, Modal } from 'react-bootstrap';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


//   if (isAuthenticated) {
//     navigate('/profile/:userId'); 
//   }
async function handleLogin() {
    // Make an API call to authenticate the user
    try {
      // Call your authentication API endpoint passing username and password
      const response = await fetch(`/api/users/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log(data.user)
      
      if (data.user._id) {
        setIsAuthenticated(true);
        navigate(`/profile/${data.user._id}`);
        console.log("Login successful!");
      } else {
        console.error("No data");
        setShowModal(true);
        console.log("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setShowModal(true);
      console.log("Invalid username or password. Please try again.");
    }
  }

  return (
    <div className="container-fluid login" id="login">
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

    {/* Modal for invalid login */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Invalid username or password. Please try again.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
