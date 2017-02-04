const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session : false}); // არ გვინდა ქუქიები
const requireSignin = passport.authenticate('local', {session : false}); // არ გვინდა ქუქიები
 
module.exports = function (app) {
    app.get('/', requireAuth, (req, res) => {
        res.send({message : "აქა მშვიდობა"});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}