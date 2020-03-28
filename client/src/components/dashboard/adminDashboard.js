import React from 'react';
import { isAuthenticated } from '../authorization/index'
import { Link } from 'react-router-dom';
import './dashboard.css';


const AdminDashboard = () => {

    //destructuring
    const { user: {_id, name, email, role} } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">Admin Links</h3>
                <ul className="list-group">
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInformation = () => {
        return (
            <div className="card">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item"> 
                        {name}
                    </li>
                    <li className="list-group-item"> 
                        {email}
                    </li>
                    <li className="list-group-item"> 
                        {role === 1 ? 'Admin' : 'General User'}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className='main-container'>
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInformation()}
                </div>
            </div>
        </div>
    )
}


export default AdminDashboard;