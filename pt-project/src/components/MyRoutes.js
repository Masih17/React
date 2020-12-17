import React from 'react';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Calendar from './Calendar';
import { Link, BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";


function MyRoutes() {

    return (
        <div >
            <Link to={'/trainings'}>Trainings</Link>
            <Link to={'/customers'} >Customers</Link>
            <Link to={'/calendar'} >Calendar</Link>
            <Link to={'/trainings'} >Trainings(NEW)</Link>
            <div >
                <Router>
                    < Switch >
                        <Redirect exact from="/" to="/trainings" />
                        <Route path="/calendar" component={TrainingList} />
                        <Route path="/customers" component={CustomerList} />
                        <Route path="/calendar" component={Calendar} />
                    </Switch>
                </Router>
            </div>

        </div >
    );
}

export default MyRoutes;