const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// მოდელის განსაზღვრება
const userSchema = new Schema({
    email : {type : String, unique : true, lowercase : true},
    password : String
});

// კაუჭი შენახვისას პაროლის დასაშიფრად
// მოდელის შენახვამდე აღსრულდება ეს ფუნქცია
userSchema.pre('save', function (next) {
    // მარილის გენერაცია 
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        // ჰაშის გენერაცია 
        bcrypt.hash(this.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        })
    });

})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}
// კლასის შექმნა

const ModelClass = mongoose.model('user', userSchema);

// კლასის ექსპორტი

module.exports = ModelClass;