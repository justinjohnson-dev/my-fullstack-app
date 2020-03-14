import React from 'react';
import './developer.css';


class Developer extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        fetch('/api/html')
            .then(response => response.text())
            .then(data => this.setState({data}))
    }

    render() {
        let dev = this.state.data || 'Nothing found through endpoint /html';
        
        return (
            <div>
                <h2>~ Developer details of the full-stack application ~</h2>
                <h3>{dev}</h3>
            </div>
        );
    }
}


export default Developer;