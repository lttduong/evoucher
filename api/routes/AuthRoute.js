var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../../config/jwt');

router.post('/register', async (req, res, next) => {
    const { firstName, lastName, email, password, password2, username } = req.body;
    let errors = [];

    // Check require fields
    if(!firstName || !lastName || !email || !password || !password2){
        errors.push({ msg: "Please fill in all fields" });
        return res.json(errors);
    }

    // Check password match
    if(password !== password2){
        errors.push({ msg: "Password is not match" });
    }

    // Check password length
    if(password.length < 8){
        errors.push({ msg: "Password should be at least 8 characters" });
    }

    if(errors.length > 0) {
        return res.json(errors);
    }

    let user = await User.findOne({ where: {email: email} });
    if (user) {
        errors.push({ msg: "Email is unique" });
        return res.json(errors);
    }

    // Hash password
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    user = await User.create({ firstName: firstName, lastName: lastName, email: email, password: hashPassword, username: username});

    return res.json({id: user.id, firstName: user.firstName, lastName: user.lastName});
});

router.post('/login', passport.authenticate('local', {
    session: false
}), (req, res) => {
    // Create and sign json web token with the user as payload
    jwt.sign({
        user: req.user
    }, config.jwt.secret, config.jwt.options, (err, token) => {
        if (err) return res.status(500).json(err);

        // // Send the Set-Cookie header with the jwt to the client
        res.cookie('jwt', token, config.jwt.cookie);

        // Response json with the jwt
        return res.json({
            jwt: token
        });
    });
});

module.exports = router;