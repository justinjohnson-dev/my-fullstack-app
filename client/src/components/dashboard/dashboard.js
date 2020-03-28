import React from 'react';
import { isAuthenticated } from '../authorization/index'
import { Link } from 'react-router-dom';
import './dashboard.css';


const Dashboard = () => {

    //destructuring
    const { user: {_id, name, email, role} } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item"> 
                        <Link className="nav-link" to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInformation = () => {
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

    const purchaseHistory = () => {
        return (
            <div className="purchase">
                <div className="card mb-5">
                    <h3 className="card-header">Purchase History</h3>
                    <ul className="list-group">
                        <li className="list-group-item"> 
                            History
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className='main-container'>
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInformation()}
                    {purchaseHistory()}
                </div>
            </div>
        </div>
    )
}


export default Dashboard;