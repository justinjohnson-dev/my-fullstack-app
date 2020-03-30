import React from 'react';
import './App.css';
import Login from './components/login/login';
import Navigation from './components/navigation/navigation';
import { HomePage } from './components/home/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/private_route/private_route';
import AdminRoute from './components/private_route/admin_route';
import Signup from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard'
import AdminDashboard from './components/dashboard/adminDashboard';
import AddCategory from './components/admin/addCategory';


function App() {
  return (
    <Router>
    <Navigation />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
          <AdminRoute path="/create/category" exact component={AddCategory} />
        </Switch>
    </Router>
  );
}

export default App;