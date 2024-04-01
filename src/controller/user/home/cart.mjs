export const user_cartGet = async (req, res) => {
    if (req.session.isUserAuth) {
        res.render('cart', {isAuth: req.session.isUserAuth})
    } else {
        res.redirect('/signin')
    }
}
