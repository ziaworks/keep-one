import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './SignIn.css';

interface SignInProps {
  onSubmit?: (email: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
      } else if (onSubmit) {
        onSubmit(email);
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
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
          <p>Sign in to your account</p>
        </div>
        
        {message && <div className="error-message">{message}</div>}
        
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
          
          <div className="field">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
            />
          </div>
          
          <button 
            className="continue-button" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p className="terms">
          Don't have an account? <a href="/">Create one</a>
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