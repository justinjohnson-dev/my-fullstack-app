import React from 'react';
import './App.css';
import { LoginPage } from './components/login/login';
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
          <PrivateRoute path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </Router>
  );
}

export default App;

/*
<div className="PageSwitcher">
<NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
<NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
</div>
<div className="FormTitle">
<NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
</div>
<Route exact path="/" component={Signup}>
</Route>
<Route path="/sign-in" component={Login}>
</Route>

*/