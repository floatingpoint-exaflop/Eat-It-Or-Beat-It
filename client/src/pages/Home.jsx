import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm';
import SearchForm from '../components/SearchForm'

import { useUserCtx } from '../providers/UserProvider';

export default function Home() {

  // logic for which component is showing
  let { userData } = useUserCtx();

  console.log(userData.id)

  return (
    <>
      <div className="container-fluid">

        {userData.id !== null ? (
          <SearchForm />

        ) : (

          <div className="row">
            <div className="col-6 login">
              <LoginForm />
            </div>
            <div className="col-6 signup">
              <SignupForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
};