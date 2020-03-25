const passport = require('passport'); // original passport npm module
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { // passing it off to passport instead of our own function
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google'));
    
    app.get('/api/logout', (req, res) => {
        req.logout(); // passport method that kills the cookie in the session
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        // res.send(req.session);
        res.send(req.user);
    });
};
