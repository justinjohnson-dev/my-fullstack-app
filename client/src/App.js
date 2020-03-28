import React from 'react';
import './App.css';
import Login from './components/login/login';
import Navigation from './components/navigation/navigation';
import { HomePage } from './components/home/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { PrivateRoute } from './components/private_route/private_route';
import Signup from './components/signup/signup';

function App() {
  return (
    <Router>
    <Navigation />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </Router>
  );
}

export default App;