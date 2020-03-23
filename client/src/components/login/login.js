import React from 'react';

import './login.css';
import { userService } from '../services/service';
import { API } from '../../config';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password,
        };

        fetch('http://localhost:5000/api/signin' , {
            method: "POST",
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })  
        .then((result) => result.json())
        .then((info) => { console.log(info); })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h2 className='login-alert'>Login To Your Account!</h2>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange} type="text" name='email' className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange} type="password" name='password' className="form-control" />
            </div>
            <button onChange={this.handleSubmit} className="button"><span>Login</span></button>
            </form>
        );
    }
}

export { LoginPage }; 