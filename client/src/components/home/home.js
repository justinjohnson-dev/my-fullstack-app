import React from 'react';
import './home.css';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null
        };
    }

    render() {
        
        return (
            <div>
                <h2>Welcome to the Home page!</h2>

                <h1>This is where you will see what the site will be selling!</h1>
            </div>
        );
    }
}


export default Home;