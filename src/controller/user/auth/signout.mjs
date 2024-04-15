

export const user_signoutGet = async (req, res) => {
    try {

        req.session.destroy()
        res.redirect('/signin')

    } catch (error) {
        console.log(error, 'USER SIGNOUT GET');
    }
}