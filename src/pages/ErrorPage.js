import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom';
import './ErrorPage.css';


const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    console.log('error ', error);
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>{error.status}</h1>
        <h2>Oops! {error.statusText}</h2>
        <p>
          {error.error.message}
        </p>
        <button onClick={() => navigate('/')}>Go to Homepage</button>
      </div>
    </div>
  )
}

export default ErrorPage