import { categoryCollection } from "../../model/category.mjs";
import { productCollection } from "../../model/product.mjs";


export async function findCategory() {
    return await categoryCollection.find()
}

export async function findUniqueCategory (name){
    return await categoryCollection.findOne({name:name})
}

export async function findAllProducts() {
    return  await productCollection.find()
}

export async function findSingleProduct(id) {
    return await productCollection.findOne({ _id: id }).populate('category')

}