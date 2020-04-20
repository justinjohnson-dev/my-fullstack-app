import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './showImage'


const Card = ({product}) => {
    return (
        <div className="col-4 match-height card-direction">
            <div className="card">
                <div className="card-header product-name">{product.name}</div>
                <div className="card-body">
                    <ShowImage className='photo-size' item={product} url="products" />
                    <div className="card-body-styling">
                        <p className="product-description">{product.description.substring(0, 100)}</p>
                        <p className="product-price">${product.price}</p>
                        <Link to="/">
                            <div className="button-container">
                                <button className="button card-button">
                                    <span>View Product</span>
                                </button>
                                <button className="button card-button add-cart">
                                <span>Add to Cart</span> 
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>        
        </div>
    )
}


export default Card;