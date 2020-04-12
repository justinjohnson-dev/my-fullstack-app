import React, {useState, useEffect} from 'react';
import {getProducts} from './homeApi'
import Card from './productCard'
import Search from '../search/search'
import './home.css';


const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])


    return (
        <div className="container-fluid">
            <Search />
           <h2 className="mb-4 title">Best Sellers</h2>
           <div className="row">
               {productsBySell.map((product, index) => (<Card key={index} product={product} />))}
           </div>
        </div>
    );
}


export default Home;