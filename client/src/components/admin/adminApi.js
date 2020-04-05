export const createCategory = (userId, token, category) => {
    return fetch(`/api/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};


export const createProduct = (userId, token, product) => {
    return fetch(`/api/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: product
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};


export const getCategories = () => {
    return fetch(`/api/categories`, {
      method: "GET",
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};