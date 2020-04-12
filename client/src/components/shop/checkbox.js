import React, {useState, useEffect} from 'react'

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        // return first indexOf or -1
        const currentCategoryId = checked.indexOf(c)
        // all category IDs within the state
        const newCheckCategoryId = [...checked]

        // if returns -1 category is not already in the state
        if(currentCategoryId === -1) {
            newCheckCategoryId.push(c)
        } else {
            // will remove category from state
            newCheckCategoryId.splice(currentCategoryId, 1)
        }
        
        setChecked(newCheckCategoryId);
        handleFilters(newCheckCategoryId);
    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
}

export default Checkbox;