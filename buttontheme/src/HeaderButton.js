import React from 'react';
import ThemeContext from './ThemeContext';

function HeaderButton(props) {
  const theme = React.useContext(ThemeContext);
  return (
    <div>
      <button style={{ background: theme.backgroundColor, color: theme.color }}>Press me</button>
    </div>
  );
}

export default HeaderButton;