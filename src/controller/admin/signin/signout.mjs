

export const admin_signoutGet = async (req, res) => {
    try {

        req.session.destroy()
        res.redirect('/admin')

    } catch (error) {
        console.log(error, 'ADMIN SIGNOUT GET')
    }
}