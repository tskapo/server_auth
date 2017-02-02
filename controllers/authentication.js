const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

exports.signin = (req, res, next) => {
    // მომხმარებელი უკვე ნებადრთულია
    // მას უბრალოდ უნდა მივცეთ შესაბამისი ტოკენი
    res.send({success : true, token : tokenForUser(req.user)});
}

exports.signup = (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(422).send({error : "მომხმარებელი და პაროლი აუცილებელია"});
    }

    // არსებობს თუ არა ეს მომხმარებელი
    User.findOne({email}, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // თუ მომხმარებელი არსებობს, ვაბრუნებ შეცდომას
        if (existingUser) {
            return res.status(422).send({error : "მომხმარებელი უკვე არსებობს"});
        }
        
        // თუ მომხმარებელი არ არსებობს, ვქმნი და ვინახავ მას
        const user = new User({email, password});
        user.save((err) => {
            if (err) {
                return next(err);
            }
            
            // ვპასუხობ მოთხოვნას, რომ მომხმარებელი შეიქმნა
            res.json({success : true, token : tokenForUser(user)});
        });

    });
}

function tokenForUser (user) {
    const iat = new Date().getTime();
    return jwt.encode({iat, sub : user.id}, config.secret);
}