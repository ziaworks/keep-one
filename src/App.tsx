import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import UpcScanner from './components/UpcScanner';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="App loading">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={!session ? <Home /> : <Navigate to="/scanner" />} />
          <Route path="/scanner" element={session ? <UpcScanner /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 