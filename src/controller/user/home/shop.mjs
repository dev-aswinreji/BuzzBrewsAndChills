import { spread } from "axios";
import {findAllProductsForUser, findAllProductsForUserSortingLowToHigh} from "../../../data/products/find.mjs"


export const user_shopGet = async (req, res) => {
    try {
        const sort = req.query.sortOption
        console.log(sort,'==============================================================================5555555555555555555555555555555555555555555555555=================');
        console.log("priceLowHigh" === sort,'hehe');
        // if(sort === 'priceLowHigh'){
        //     const products = await findAllProductsForUserSortingLowToHigh()
        //     return products
        // }else{
            
        //     const products = await findAllProductsForUser()
        //     return products
        // }
        console.log(sort,'sort is showing');
        const sorteddd = await findAllProductsForUserSortingLowToHigh()
        console.log(sorteddd,'sorted data is showing');
        const products = sort === 'priceLowHigh' ? await findAllProductsForUserSortingLowToHigh() : await findAllProductsForUser()
        console.log(products,'products is shwoing');
        res.render('shop', {products})

    } catch (error) {

        console.error(error, 'USER SHOP GET')
    }

}


const user_shopProductSortingGet = async (req,res)=>{
    res.re
}