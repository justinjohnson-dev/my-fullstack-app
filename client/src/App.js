import React from 'react';
import logo from './logo.svg';
import './App.css';
import Developer from './components/developer/developer'
import Login from './components/login/login';
import Navigation from './components/navigation/navigation';
import Home from './components/home/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navigation />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
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