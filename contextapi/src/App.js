import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import UserContext from './components/UserContext';

function App() {
  const [user, setUser] = useState({ user: {} });

  useEffect(() =>
    setUser({ user: { username: 'MasihS', name: 'Shekarak' } })
    , [])
  // Above we populate our use object which we defined in userContext
  // This {user} below is what we created 
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

export default App;
