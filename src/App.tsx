import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import UpcScanner from './components/UpcScanner';
import Home from './components/Home';
import { User, getCurrentUser, setupAuthListener, signOut } from './utils/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkUser();

    // Set up auth listener
    const cleanup = setupAuthListener((user) => {
      setUser(user);
      setLoading(false);
    });

    return cleanup;
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <nav className="app-nav">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/scanner">UPC Scanner</Link>
              <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={user ? <Navigate to="/scanner" /> : <SignIn />} />
          <Route 
            path="/scanner" 
            element={user ? <UpcScanner /> : <Navigate to="/signin" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 