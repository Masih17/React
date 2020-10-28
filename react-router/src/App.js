import React from 'react';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div className='Header'>
            <h1>Welcome to React Router</h1>
          </div >

          <nav className='nav'>
            <Link to="/">Home</Link>{' '}
            <Link to="/about">About</Link>{' '}
            <Link to="/contact">Contact</Link>{' '}

          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route render={() => <h1> Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div >
  );
}

export default App;
