export const user_cartGet = async (req, res) => {
    try {

        if (req.session.isUserAuth) {
            res.render('cart')
        } else {
            res.redirect('/signin')
        }

    } catch (error) {
        console.log(error, 'USER CART GET');
    }
}
