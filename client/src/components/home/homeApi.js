export const getProducts = (sortBy) => {
    return fetch(`/api/products?sortBy=${sortBy}&order=desc&limit=6`, {
      method: "GET",
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};