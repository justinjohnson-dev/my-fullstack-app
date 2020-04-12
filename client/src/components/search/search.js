import React, {useState, useEffect} from 'react';
import { getCategories, list } from '../shop/shopApi'
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

    // destructuring from state
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
            <div className="container">{searchForm()}</div>
        </div>
    );
};

export default Search;