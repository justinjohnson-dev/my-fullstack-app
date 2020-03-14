const express = require('express');
const app = express();

var path = require("path");
var mongo = require('mongodb');

/*  Example of code that would send data through an API -
    Will eventually use an endpoint to extract data from MongoDB

app.get('/api/welcome', (req, res) => {
    // This is where we would connect to mongoDB
    const data = [
        {id: 1, firstName: 'Justin', lastName: 'Johnson'}
    ];

    res.json(data);
});

*/

// Sending data to an endpoint called /html for our client to display
app.get('/api/html',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

// Server being ran on port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);