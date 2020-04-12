import React, {useState, useEffect} from 'react';
import {getCategories, getFilteredProducts} from './shopApi'
import Card from '../home/productCard'
import Checkbox from './checkbox'
import RadioBox from './radioBox'
import {prices} from './fixedPrices'
import './shop.css';


const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setfilteredResults] = useState([]);

    // load categories - set form data
    const init = () => {
        getCategories().then(data=> {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        });
    };

    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setfilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit

        getFilteredProducts(toSkip, limit, myFilters.filter).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setfilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 && 
            size >= limit && (
                <button onClick={loadMore} className="button mt-5">
                    Load More
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);
    
    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h3>Filter by categories</h3>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")} />
                    </ul>
                    <h3>Filter by price range</h3>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")} />
                    </div>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <Card key={i} product={product} />
                        ))}
                    </div>
                    {loadMoreButton()}
                </div>
            </div>
        </div>
    );
};

export default Shop;