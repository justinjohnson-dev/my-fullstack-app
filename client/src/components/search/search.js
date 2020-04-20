import React, {useState, useEffect} from 'react';
import { getCategories, list } from '../shop/shopApi'
import Card from '../home/productCard'
import './search.css';

const Search = () => {

    // creating state for search bar
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    // destructuring
    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        });
    };

    // loadCategories when categories mount
    useEffect(() => {
        loadCategories()
    }, [])

    const searchData = () => {
        if(search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    };

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, searched:false});
    };

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} product`
        }

        if(searched && results.length < 1) {
            return `No Products Found`
        }
    }

    const searchedProduct = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (<Card key={i} product={product} />))}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form className='form-sytle' onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">Pick Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search by name" />
                </div>
                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="button"><span>Search</span></button>
                </div>
            </span>
        </form>
    )

    return (
        <div className="row search-form">
            <div className="search-form-style">{searchForm()}</div>
            <div className="container-fluid">{searchedProduct(results)}</div>
        </div>
    );
};

export default Search;