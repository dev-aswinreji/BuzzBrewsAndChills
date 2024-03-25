import Swal from "sweetalert2"
import { findProduct } from "../../../data/products/find.mjs"


export const user_cartGet = async (req, res) => {

  try {

    if (req.session.isAuth) {
      const data = req.params.id
      console.log(data)
      const cartProduct = await findProduct(data)
      res.render('cartempty', { cartProduct })
    } else {
      res.redirect('/signin')
    }

  } catch (error) {
    console.error(error)
  }

}
