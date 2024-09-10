import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';

export default function SignupForm() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState({
    username: false,
    email: false,
    password: false
});
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email' && !emailPattern.test(value)) {
        setValidationErrors({
            ...validationErrors,
            email: true
        });
    } else if (value.trim() === '') {
        setValidationErrors({
            ...validationErrors,
            [name]: true
        });
    } else {
        setValidationErrors({
            ...validationErrors,
            [name]: false
        });
    }
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Simulate creating a user (replace this with your actual logic)
      const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify( userFormData ),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();

      console.log('Creating user:', data);

      setUserFormData({
        username: '',
        email: '',
        password: '',
      });

      // Clear validation errors
      setValidationErrors({
        name: false,
        email: false,
        message: false
    });

      // Show the modal on successful signup
      setShowModal(true);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} className="container-fluid signup" id="signup">
        <h3>Signup</h3>
        <Form.Group className="mb-3">
            <Form.Control 
                type="text" 
                name="username" 
                placeholder="Username"
                className={`form-control ${validationErrors.username ? 'is-invalid' : ''}`} 
                value={userFormData.username} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                aria-describedby="username" 
            />
            {validationErrors.username && <Form.Control.Feedback type="invalid" id="valid-username">Username is required</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control 
                type="text" 
                name="email" 
                placeholder="Email"
                className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`} 
                value={userFormData.email} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                aria-describedby="email" 
            />
            {validationErrors.email && <Form.Control.Feedback type="invalid" id="valid-email">Email is required</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control 
                type="password" 
                name="password"
                placeholder="Password"
                className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`} 
                value={userFormData.password} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
            />
            {validationErrors.password && <Form.Control.Feedback type="invalid" id="valid-password">Password is required</Form.Control.Feedback>}
    </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='primary'>
          Submit
        </Button>
         {/* show alert if server response is bad */}
         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>
      </Form>

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <p>Your signup was successful!</p>
              </div>
                <button type="button"  className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>Close
                </button>
            </div>
          </div>
        </div>
      )}
      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your signup was succesful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ whiteSpace: "pre-wrap" }}></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}