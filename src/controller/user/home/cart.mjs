import Swal from "sweetalert2"
import { findAllProducts } from "../../../data/products/find.mjs"


export const user_cartGet = async (req, res) => {

  try {

    if (req.session.isUserAuth) {
      const data = req.params.id
      console.log(data)
      const cartProduct = await findAllProducts(data)
      res.render('cartempty', { cartProduct })
    } else {
      res.redirect('/signin')
    }

  } catch (error) {
    console.error(error)
  }

}
