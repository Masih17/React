import React from 'react';
import Tabs from './components/Tabs';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TrainingList from './components/TrainingList';
import Customerlist from './components/CustomerList';
import Calendar from './components/Calendar';



function App() {

  return (

    <div className="App">

      <Router>
        <div>
          < Switch >
            <Tabs />
            <Redirect exact from="/" to="/trainings" />
            <Route path="/calendar" component={TrainingList} />
            <Route path="/customers" component={Customerlist} />
            <Route path="/calendar" component={Calendar} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;