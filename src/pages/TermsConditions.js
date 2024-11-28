import React from 'react';
import '../styles/TermsConditions.css';

export const TermsCondition = () => {
  return (
    <div className='container terms-page'>
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to Ace Clean Experts! By accessing or using our services, you agree to the following terms and conditions.
      </p>
      <h2>1. Service Agreement</h2>
      <p>
        Our cleaning services are provided based on the preferences you share with us. You agree to provide accurate information to help us serve you better.
      </p>
      <h2>2. Payments</h2>
      <p>
        Payments are due upon booking or as otherwise specified. We reserve the right to suspend or cancel services for unpaid invoices.
      </p>
      <h2>3. Cancellations</h2>
      <p>
        Cancellations must be made at least 24 hours in advance to avoid a cancellation fee.
      </p>
      <h2>4. Liability</h2>
      <p>
        Ace Clean Experts is not liable for any indirect or consequential damages arising from the use of our services.
      </p>
    </div>
  );
};

