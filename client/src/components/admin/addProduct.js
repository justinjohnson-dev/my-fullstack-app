import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../authorization/index'
import { createProduct, getCategories } from '../admin/adminApi'
import { Link } from 'react-router-dom';
import './admin.css';


const AddProduct = () => {
    // Destructuring user
    const {user, token} = isAuthenticated()
    const [values, setValues] = useState({
        name: '',
        description:'',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    // Destructuring state
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories - set form data
    const init = () => {
        getCategories().then(data=> {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, categories: data, formData: new FormData()});
            }
        })
    }

    // data added to formData for photo
    useEffect(() => {
        init();
    }, []);

    // higher order function
    // function returning another function
    const handleChange = name => event => {
        // if photo grab first file in array
        const value = name === 'photo' ? event.target.files[0]
            : event.target.value;

        // setting the form data
        formData.set(name, value);

        // grabbing values in state
        setValues({...values, [name]: value});
    }

    const clickSubmit = (event) => {
        event.preventDefault()

        setValues({...values, error:'', loading: true});

        // Send data to backend to store in db
        createProduct(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                console.log('clearing fields')
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    category: '',
                    shipping: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });  
    }

    const newPostForm = () => (
        <form onSubmit={clickSubmit} className="mb-3">
            <h3> Post Photo </h3>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type='text' className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} type='text' className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type='number' className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                <option>Please Select</option>
                {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
                </div>
                
                <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                <option>Please Select</option>
                    <option value="1">Yes</option>n>
                    <option value="0">No</option>n>
                </select>
                </div>
                
                <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type='number' className="form-control" value={quantity} />
            </div>

            <button className="category-button">
                <span>Create new Product</span>
            </button>
        </form>
    )

    const showError = () => (
        <div className="created-response" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="text-success created-response" style={{display: createdProduct ? '' : 'none'}}>
            <h3>{`${createdProduct}`} is created!</h3>
        </div>
    )

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
                {newPostForm()}
                {backToDashboard()}
            </div>
        </div>
    )
};


export default AddProduct;