

export const admin_ordersGet = async (req, res) => {

    try {
        if (req.session.isAdminAuthenticated) {

            res.render('orders')

        } else {
            res.redirect('/admin')
        }
        
    } catch (error) {
        console.error(error)
    }

}