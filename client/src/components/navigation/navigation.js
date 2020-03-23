import React from 'react';
import './navigation.css';
import {Link, withRouter} from 'react-router-dom';


class Navigation extends React.Component {
    constructor() {
        super();
    }

    render() {
        
        return (
            <nav>
                <h3 className="logo">JJ Brand</h3>
                <ul className="nav-links">
                    
                    <li>
                        <Link className='nav-style' to='/'>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link className='nav-style' to='/login'>
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link className='nav-style' to='/signup'>
                            Sign Up
                        </Link>
                    </li>
                    
                </ul>
            </nav>
        );
    }
}


export default Navigation;