export const user_authentication = async (req, res, next) => {
    if (req.session.isUserAuth) {
        console.log(req.session.isUserAuth, 'user authentication is working');
        next()
    } else {
        req.redirect('/signin')
    }
}
