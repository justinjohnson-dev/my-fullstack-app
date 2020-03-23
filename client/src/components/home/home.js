import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Layout from '../navigation/layout'
import { userService } from '../services/service'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { user, users } = this.state;
        return (
            <div className="home-container">
                <h1>Hello, {user.firstName}!</h1>
                <p>You're logged in with React & Basic HTTP Authentication!!</p>
                <p className="message-logout">You can log back out by clicking the click below</p>
                <p>
                    <Link className="logout-style" to="/login"><button className="button"><span>Logout</span></button></Link>
                </p>
            </div>
        );
    }
}

export { HomePage };