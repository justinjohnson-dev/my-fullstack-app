import React, {useState} from 'react';
import './signup.css';
import {Link} from 'react-router-dom';
import { API } from '../../config';
import { signUpUser } from '../authorization/index'

/* Utilizing React hooks */


const Signup = () => {
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success: false
  });

  // Destructuring
  const {name, email, password, success, error} = values

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: false});

    signUpUser({name, email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, 
                success: false})
      } else {
        setValues({
          ...values, 
          name:'',
          email:'',
          password:'',
          error: '',
          success: true
        })
      }
    });
  }

  const errorWhileSigningUp = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
  );

  const showSuccessOnSignUp = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
      Your new account has successfully been created! <Link to="/login">Login!</Link>
    </div>
  );

  const signUpForm = () => (
    <form>
      <h2 className='login-alert'>Create Your Account!</h2>
      <div className="form-group">
          <label className="text-muted">Name</label>
          <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
      </div>
      <div className="form-group">
          <label className="text-muted">Email</label>
          <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
      </div>
      <div className="form-group">
          <label className="text-muted">Password</label>
          <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
      </div>
      <button onClick={handleSubmit} className="button create-button"><span>Create Account</span></button>
    </form>
  );

  return (
    <div>
      {showSuccessOnSignUp()}
      {errorWhileSigningUp()}
      {signUpForm()}
    </div>
  );
};


export default Signup;
















// import React, {useState} from 'react';
// import './signup.css';
// import axios from 'axios';
// import {Link} from 'react-router-dom';
// import { API } from '../../config';


// class Signup extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: null,
//       email: null,
//       password: null,
//     };
//   }

//   handleChange = (event) => {
//     event.preventDefault();
//     console.log(event)
//     console.log(event.target.name)
//     console.log(event.target.value)
//     this.setState({ 
//       [event.target.name]: event.target.value 
//     });
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();

//     const { name, email, password } = this.state;

//     console.log(name)
//     const user = {
//       name,
//       email,
//       password,
//     };

//     fetch('http://localhost:5000/api/signup' , {
//       method: "POST",
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify(this.state)
//     })  
//     .then((result) => result.json())
//     .then((info) => { console.log(info); })
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <h2 className='login-alert'>Create Your Account!</h2>
//         <div className="form-group">
//             <label className="text-muted">Name</label>
//             <input onChange={this.handleChange} type="text" name='name' className="form-control" />
//         </div>
//         <div className="form-group">
//             <label className="text-muted">Email</label>
//             <input onChange={this.handleChange} type="text" name='email' className="form-control" />
//         </div>
//         <div className="form-group">
//             <label className="text-muted">Password</label>
//             <input onChange={this.handleChange} type="password" name='password' className="form-control" />
//         </div>
//         <button onChange={this.handleSubmit} className="button create-button"><span>Create Account</span></button>
//       </form>
//     );
//   }
// }

// export default Signup;