export const user_aboutGet = async (req, res) => {
    if (req.session.isUserAuth) {
        res.render('about')
    } else {
        res.redirect('/signup')
    }
}


