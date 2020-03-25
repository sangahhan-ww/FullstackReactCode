const express = require('express'); // only using common js modules; no support for es2015 modules ==> no import syntax
const keys = require('./config/keys');
const mongoose = require('mongoose'); 
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/user');
require('./services/passport'); // makes sure our passport js gets run

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express(); // represents a running express app
// express app: listens for incoming requests, and then routes them

app.use(
    // gets cookie & assigned to req.session
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // how long can the cookie exist in the browser = 30 days in ms
        keys: [keys.cookieKey] // used to sign/encrypt our cookie; we can specify multiple for additional security
    })
);
// cookie-session vs express-session:
// cookie-session: cookie contains all the (encrypted) session info
// express-session: cookie contains session id, and that's looked up in another storage system, which we need to set up

// tell passport that it should make use of cookies to handle the session
// Q: how does this work? how does that happen? 
app.use(passport.initialize());
app.use(passport.session()); // uses cookieSession & puts seriealized info into session

require('./routes/auth')(app); // executes the exported arrow function from auth.js

// a new route handler
// using the get method
// and the / route (which gets added by the browser)
// if express finds that someone hits the specified route, it executes the arrow function we wrote
app.get('/', (req, res) => {
    res.send('Heyo mayo');
});



const PORT = process.env.PORT || 5000; // env vars in the underlying runtime that node is running on
app.listen(PORT); // <-- express tells node to listen to port PORT