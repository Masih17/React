import React from 'react';
import Tabs from './components/Tabs';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TrainingList from './components/TrainingList';
import Customerlist from './components/CustomerList';
import Calendar from './components/Calendar';



function App(props) {

  return (

    <div className="App">

      {/* < Switch >
              <Route exact path="/:page?" render={props => <Home {...props} />} />
              <Redirect exact from="/" to="/trainings" />
              <Route path="/calendar" component={TrainingList} />
              <Route path="/customers" component={CustomerList} />
              <Route path="/calendar" component={Calendar} />
            </Switch> */}

      <Router>
        <div>
          <Switch>
            <Tabs />
            <Redirect exact from="/" to="/trainings" />
            <Route exact path="/trainings" render={props => <TrainingList {...props} />} />
            <Route exact path="/customers" render={props => <Customerlist {...props} />} />
            <Route exact path="/calendar" render={props => <Calendar {...props} />} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;