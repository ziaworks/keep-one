import React, { useState } from 'react';
import './SignIn.css';

interface SignInProps {
  onSubmit?: (email: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
    console.log('Email submitted:', email);
  };

  return (
    <div className="sign-in-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="left-side">9:41</div>
        <div className="notch"></div>
        <div className="right-side">
          <div className="battery"></div>
          <div className="wifi"></div>
          <div className="mobile-signal"></div>
        </div>
      </div>

      {/* App Logo */}
      <div className="app-logo">
        KEEP
      </div>

      {/* Content */}
      <div className="content">
        <div className="copy">
          <p>Enter your email to sign up for this app</p>
        </div>
        
        <form className="input-button" onSubmit={handleSubmit}>
          <div className="field">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <button className="continue-button" type="submit">
            Continue
          </button>
        </form>
        
        <p className="terms">
          By clicking continue, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Home Indicator */}
      <div className="home-indicator">
        <div className="indicator"></div>
      </div>
    </div>
  );
};

export default SignIn; 