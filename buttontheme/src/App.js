import React from 'react';
import Header from './Header';
import ThemeContext from './ThemeContext'

export const buttonThemes = {
  blue: {
    color: 'white',
    backgroundColor: 'blue',
    width: '100px',
    height: "30px"

  },
  black: {
    color: 'white',
    backgroundColor: 'black',
    width: '100px',
    height: "30px"
  },
};

function App() {
  return (
    <ThemeContext.Provider value={buttonThemes.blue}>
      <Header />
    </ThemeContext.Provider >
  );
}

export default App;
