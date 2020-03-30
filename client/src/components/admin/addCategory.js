import React, { useState } from 'react';
import { isAuthenticated } from '../authorization/index'
import { createCategory } from '../admin/adminApi'
import { Link } from 'react-router-dom';
import './admin.css';


const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Destructuring user
    const {user, token} = isAuthenticated()

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setError('')
        setSuccess(false)

        // Send data to backend to store in db
        createCategory(user._id, token, {name})
        .then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError('');
                setSuccess(true);
            }
        });
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit} className="main-form">
            <div className="form-group">
                <label className="text-muted">
                    Category Name
                </label>
                <input type="text" className="form-control"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                />
            </div>
            <button className="category-button">
                <span>Create New Category</span>
            </button>
        </form>
    )

    const showSuccess = () => {
        if (success) {
            return <h4 className="text-success created-response">{name} has been created!</h4>
        }
    }

    const showError = () => {
        if (error) {
            return <h4 className="created-response">{name} already exists within the database!</h4>
        }
    }

    const backToDashboard = () => (
        <div className="mt-5 back-to-dashboard">
            <Link to="/admin/dashboard" className="nav-link">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showSuccess()}   
                {showError()}   
                {newCategoryForm()}
                {backToDashboard()}
            </div>
        </div>
    )
};


export default AddCategory;