import React from 'react';
import './navigation.css';
import {Link, withRouter} from 'react-router-dom';
import {signout} from '../authorization/index'


class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    isActive(history, path) {
        if (history.location.pathname === path) {
            return {color: '#ff9900'}
        } else {
            return {color: 'ffffff'}
        }
    }

    render() {
        return (
            <nav>
                <h3 className="logo">JJ Brand</h3>
                <ul className="nav-links">
                    
                    <li>
                        <Link className='nav-style links' style={this.isActive(this.props.history, '/')} to='/'>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link className='nav-style links' style={this.isActive(this.props.history, '/login')} to='/login'>
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link className='nav-style links' style={this.isActive(this.props.history, '/signout')} to='/signup'>
                            Sign Up
                        </Link>
                    </li>

                    <li>
                        <span className='nav-style links' onClick={() => signout(() => {
                            this.props.history.push('/');
                        })} to='/signout'>
                            Sign Out
                        </span>
                    </li>
                    
                </ul>
            </nav>
        );
    }
}


export default Navigation;