import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './showImage'


const Card = ({product}) => {
    return (
        <div className="col-4 row match-height">
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="products" />
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <Link to="/">
                        <button className="btn btn-outline-primary mt-2 mb-2 button-space">
                            View Product
                        </button>
                        <button className="btn btn-outline-warning mt-2 mb-2 button-space">
                            Add to Cart
                        </button>
                    </Link>
                </div>
            </div>        
        </div>
    )
}


export default Card;