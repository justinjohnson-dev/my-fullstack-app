export const getCategories = () => {
    return fetch(`/api/categories`, {
      method: "GET",
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    
    const data = {
        limit, skip, filters
    };

    return fetch(`/api/products/by/search`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};