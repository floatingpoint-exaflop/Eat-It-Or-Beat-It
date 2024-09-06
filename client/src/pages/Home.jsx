import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm';


export default function Home() {


  // logic for which component is showing

  return (
    <>
      <h1>This is a test for the homepage</h1>
      <LoginForm />
      <SignupForm />
      
    </>
  );
};