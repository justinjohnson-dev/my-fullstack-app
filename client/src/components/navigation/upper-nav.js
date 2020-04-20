import React, { Fragment } from 'react';
import './navigation.css';
import { Link, withRouter } from 'react-router-dom';
import Search from '../search/search'



// Destructuring history
const UpperNav = () => (
    <nav className="upper-nav">
        <h3 className="logo">JJ Brand</h3>
        <Search />
    </nav>
);



export default withRouter(UpperNav);