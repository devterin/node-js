const passport = require("passport");

// login google
const loginGoogle = (req, res, next) => {
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })(req, res, next);
};

// callback google
const callbackGoogle = (req, res, next) => {
    passport.authenticate("google", {
        failureRedirect: "/"
    }, (err, user) => {
        if (err || !user) {
            console.log('Google auth error:', err);
            return res.redirect("/");
        }

        // Log ra profile Google để debug
        console.log('=== GOOGLE PROFILE RECEIVED ===');
        console.log('User ID:', user.id);
        console.log('Display Name:', user.displayName);
        console.log('Email:', user.emails && user.emails[0] ? user.emails[0].value : 'No email');
        console.log('Profile Picture:', user.photos && user.photos[0] ? user.photos[0].value : 'No photo');
        console.log('Full Profile Object:', JSON.stringify(user, null, 2));
        console.log('================================');

        req.login(user, (err) => {
            if (err) {
                console.log('Login error:', err);
                return next(err);
            }
            console.log('User logged in successfully:', user.displayName);
            return res.redirect("/list.html");
        });
    })(req, res, next);
};

const getProfile = (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    }
    return res.status(401).json({
        success: false,
        message: "Not authenticated"
    });
};

// logout
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

module.exports = {
    loginGoogle,
    callbackGoogle,
    getProfile,
    logout
};
