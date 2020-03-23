import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { configureBackend } from '../src/components/helpers/helper.js';
configureBackend();


ReactDOM.render(<App />, document.getElementById('root'));