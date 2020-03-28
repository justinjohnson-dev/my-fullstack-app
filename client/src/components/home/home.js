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

    render() {
        const { user, users } = this.state;
        return (
            <div className="main-container">
                <h1>Hello!</h1>
                <p className="message-logout">Welcome to the home page of the application</p>
                <p className="message-logout">You can now view your dashboard!</p>
            </div>
        );
    }
}

export { HomePage };