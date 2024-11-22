import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ErrorPage.css';

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-content">
                <h1>404</h1>
                <h2>Oops! Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist. It might have been moved or deleted.</p>
                <button onClick={() => navigate('/')}>Go to Homepage</button>
            </div>
        </div>
    );
};

