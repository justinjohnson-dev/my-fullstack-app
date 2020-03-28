/* FILE DEDICATED TO ALL CALLS TO BACKEND */

export const signUpUser = (user) => {
    return fetch('http://localhost:5000/api/signup' , {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};

export const signIn = (user) => {
    return fetch('http://localhost:5000/api/signin' , {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(result => {
      return result.json()
    }).catch(err => {
      console.log(err)
    });
};


// accessing local storage to keep users logged in
export const authenticate = (data, callback) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        callback();
    }
};


export const signout = (callback) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        callback();
        
        return fetch('http://localhost:5000/api/signout', {
            method: "GET"
        }).then(result => {
            console.log('signout', result);
        }).catch(err => {
            console.log(err);
        })
    }
};