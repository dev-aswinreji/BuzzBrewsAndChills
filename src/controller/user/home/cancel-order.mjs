import { updateCancelProduct } from "../../../data/order/update.mjs"
import { findSingleProduct } from "../../../data/products/find.mjs"
import { updateProducts } from "../../../data/products/update.mjs"


export const user_cancelOrderGet = async (req,res)=>{
    const productId = req.query.productId
    const product = await findSingleProduct(productId)
    const quantity = req.query.quantity 
    console.log(product.stock,quantity);
    let updateProductStock = Number(product.stock) + Number(quantity)
    console.log(updateProductStock,'updatedStock is showing');
    await updateCancelProduct(product._id)
    const data = await updateProducts(productId,{stock:updateProductStock})

    console.log(data,'is stock is updated successfully');
    res.json({result:'success'})
}