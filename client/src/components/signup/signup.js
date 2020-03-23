import React, {useState} from 'react';
import './signup.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { API } from '../../config';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    console.log(event)
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({ 
      [event.target.name]: event.target.value 
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;

    console.log(name)
    const user = {
      name,
      email,
      password,
    };

    fetch('http://localhost:5000/api/signup' , {
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
    const {name} = this.state 
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={this.handleChange} type="text" name='name' className="form-control" />
        </div>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={this.handleChange} type="text" name='email' className="form-control" />
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={this.handleChange} type="text" name='password' className="form-control" />
        </div>
        <button onChange={this.handleSubmit} className="button"><span>Submit</span></button>
      </form>
    );
  }
}

export default Signup;
