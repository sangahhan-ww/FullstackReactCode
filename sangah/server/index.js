const express = require('express'); // only using common js modules; no support for es2015 modules ==> no import syntax
const app = express(); // represents a running express app

// express app: listens for incoming requests, and then routes them

// a new route handler
// using the get method
// and the / route (which gets added by the browser)
// if express finds that someone hits the specified route, it executes the arrow function we wrote
app.get('/', (req, res) => {
    res.send({'hi': 'there'});
});

const PORT = process.env.PORT || 5000; // env vars in the underlying runtime that node is running on
app.listen(PORT); // <-- express tells node to listen to port PORT