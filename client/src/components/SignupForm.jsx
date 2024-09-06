import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function SignupForm() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Simulate creating a user (replace this with your actual logic)
      console.log('Creating user:', userFormData);

      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      <h3>Signup</h3>
      <Form onSubmit={handleFormSubmit} className="col-6">
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username' />
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email' />
          <Form.Control
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password' />
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='primary'>
          Submit
        </Button>
      </Form>
    </>
  );
}