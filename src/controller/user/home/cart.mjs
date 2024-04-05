export const user_cartGet = async (req, res) => {
    if (req.session.isUserAuth) {
        res.render('cart')
    } else {
        res.redirect('/signin')
    }
}
