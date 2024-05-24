import { categoryCollection } from "../../model/category.mjs";
import { productCollection } from "../../model/product.mjs";


export async function findCategory() {
    return await categoryCollection.find()
}

export async function findUniqueCategoryUsingId(id){
    return await categoryCollection.findById(id)
}

export async function findUniqueCategory (categoryName){
    return await categoryCollection.findOne({name:{$regex: new RegExp(categoryName,'i')}})
}

export async function findAllProducts() {
    return  await productCollection.find().populate('category')
}

export async function findSingleProduct(id) {
    return await productCollection.findById(id).populate('category')

}

export async function findSingleProductWithSameName(productName){
    return await productCollection.findOne({name:{$regex: new RegExp(productName,'i')}})
 }

export async function findAllProductsForUser (){
    return (await productCollection.find({availability:'AVAILABLE'}).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingLowToHigh(){
    return (await productCollection.find({availability:'AVAILABLE'}).sort({price:1}).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingHighToLow(){
    return (await productCollection.find({availability:'AVAILABLE'}).sort({price:-1}).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}