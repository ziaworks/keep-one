import React from 'react';
import './App.css';
import SignIn from './components/SignIn';

function App() {
  const handleSignIn = (email: string) => {
    console.log('User signed in with:', email);
    // Here you would typically handle authentication
  };

  return (
    <div className="App">
      <SignIn onSubmit={handleSignIn} />
    </div>
  );
}

export default App; 