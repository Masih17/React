import React, { Component } from 'react';
import './App.css';
import TodolistDelete from './components/TodoListDelete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Home from './components/Home';

function App() {

  const [value, setValue] = React.useState('one');
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            TodoList
          </Typography>
        </Toolbar>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="HOME" />
          <Tab value="two" label="MY TODOS" />
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Home /></div>}
      { value === 'two' && <div><TodolistDelete /></div>}

    </div >
  );
}

export default App;