

export const admin_signoutGet = async (req, res) => {
    req.session.destroy()
    res.redirect('/admin')
}