import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './showImage'


const Card = ({product}) => {
    return (
        <div className="col-4 match-height">
            <div className="card">
                <div className="card-header product-name">{product.name}</div>
                <div className="card-body">
                    <ShowImage className='photo-size' item={product} url="products" />
                    <p>{product.description.substring(0, 100)}</p>
                    <p>${product.price}</p>
                    <Link to="/">
                        <button className="button card-button">
                            <span>View Product</span>
                        </button>
                        <button className="button card-button add-cart">
                           <span>Add to Cart</span> 
                        </button>
                    </Link>
                </div>
            </div>        
        </div>
    )
}


export default Card;