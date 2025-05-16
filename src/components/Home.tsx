import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Home.css';

type AuthMode = 'signup' | 'login';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setMessageType('error');
          setMessage(error.message);
        } else {
          setMessageType('success');
          setMessage('Check your email for the confirmation link!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessageType('error');
          setMessage(error.message);
        } else {
          navigate('/scanner'); // Redirect to scanner page after login
        }
      }
    } catch (error: any) {
      setMessageType('error');
      setMessage('An unexpected error occurred');
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setMessage('');
  };

  return (
    <div className="home-container">
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

      <div className="content">
        <h1 className="title">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="subtitle">
          {mode === 'login' 
            ? 'Sign in to continue to your account' 
            : 'Sign up to start scanning UPC codes'}
        </p>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleAuth}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mode-toggle">
          <p>
            {mode === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
            <button 
              type="button" 
              className="toggle-button" 
              onClick={toggleMode}
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="home-indicator">
        <div className="indicator"></div>
      </div>
    </div>
  );
};

export default Home; 