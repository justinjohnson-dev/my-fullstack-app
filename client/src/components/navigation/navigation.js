import React from 'react';
import './navigation.css';
import {Link} from 'react-router-dom';


class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null
        };
    }

    render() {
        
        return (
            <nav>
                <h3 className="logo">Logo</h3>
                <ul className="nav-links">
                    <Link className='nav-style' to='/home'>
                        <li>Home</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}


export default Navigation;