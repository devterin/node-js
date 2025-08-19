const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

function initGoogleAuth() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('Google profile:', profile);
        // logic save db
        return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = { initGoogleAuth };

