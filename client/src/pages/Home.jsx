import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm';


export default function Home() {


  // logic for which component is showing

  return (
    <>
      <h1>This is a test for the homepage</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 login">
            <LoginForm />
          </div>
          <div className="col-6 signup">
            <SignupForm />
          </div>
        </div>

      </div>
    
      
    </>
  );
};