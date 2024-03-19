import Swal from "sweetalert2"


export const user_cartGet = async (req, res) => {
    if (req.session.isAuth) {
        res.render('cart',{isAuth:req.session.isAuth})
    }else{
      res.redirect('/signin')
    }
} 