const ensureAuthenticated = (req, res, next) => {
    console.log('isAuthenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

module.exports = ensureAuthenticated;