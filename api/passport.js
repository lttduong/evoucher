// =============================================================================
// Configure Strategy
// =============================================================================
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/jwt');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    // Authenticate API calls with the Cookie Combo Strategy
    passport.use(new JwtCookieComboStrategy({
        secretOrPublicKey: config.jwt.secret,
        jwtVerifyOptions: config.jwt.options,
        passReqToCallback: false
    }, (payload, done) => {
        return done(null, payload.user, {});
    }));

    passport.use(new LocalStrategy({
        // My users have only email
        usernameField: 'email',
        session: false
    }, async (username, password, done) => {
        let user = await User.findOne({ where: {email: username} });

        if (user && await verifyPassword(password, user.password)) {
            return done(null, {
                id: user.id,
                role: user.roleId
            });
        }

        return done(null, false);
    }));

    let verifyPassword = async (password, userPassword) => {
        return await bcrypt.compare(password, userPassword);
    }
}