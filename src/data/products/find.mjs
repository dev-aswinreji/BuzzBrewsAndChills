import { productCollection } from "../../model/product.mjs";


export async function findAllProducts (){
    return await productCollection.find()
}

export async function findSingleProduct (id){
    return await productCollection.findOne({_id:id})

}