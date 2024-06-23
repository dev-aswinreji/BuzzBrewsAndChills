
export function isAuthenticated(req, res, next) {
    if (req.session.isUserAuth) {
        return next();
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
}