

export const user_cartGet = async (req, res) => {
    if (req.session.isAuth) {
        res.render('cart')
    }else{
        res.status(401).json({ message: 'Please sign in to continue' });
    }
} 