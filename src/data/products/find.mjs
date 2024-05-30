import { skip } from "node:test";
import { categoryCollection } from "../../model/category.mjs";
import { productCollection } from "../../model/product.mjs";


export async function findCategory() {
    return await categoryCollection.find()
}

export async function findAllActiveCategory(){
    return await categoryCollection.find({availability:'ACTIVE'})
}

export async function findUniqueCategoryUsingId(id){
    return await categoryCollection.findById(id)
}

export async function findUniqueCategory (categoryName){
    return await categoryCollection.findOne({name:{$regex: new RegExp(categoryName,'i')}})
}

export async function findAllProducts(skip,limit) {
    return  await productCollection.find().skip(skip).limit(limit).populate('category')
}


export async function findSingleProduct(id) {
    return await productCollection.findById(id).populate('category')

}

export async function findSingleProductWithSameName(productName){
    return await productCollection.findOne({name:{$regex: new RegExp(productName,'i')}})
 }

export async function findAllProductsForUser (skip,limit){
    return (await productCollection.find({availability:'AVAILABLE'}).skip(skip).limit(limit).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingLowToHigh(skip,limit){
    return (await productCollection.find({availability:'AVAILABLE'}).sort({discount_price:1}).skip(skip).limit(limit).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingHighToLow(skip,limit){
    return (await productCollection.find({availability:'AVAILABLE'}).sort({discount_price:-1}).skip(skip).limit(limit).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingAtoZ(skip,limit){
    return (await productCollection.find({availability:'AVAILABLE'}).sort({name:1}).skip(skip).limit(limit).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingZtoA(skip,limit){
    return (await productCollection.find({availability:'AVAILABLE'}).sort({name:-1}).skip(skip).limit(limit).populate('category')).filter(products=>products.category.availability === 'ACTIVE')
}

export async function findTotalCountOfAllProductsForAdmin (){
    return await productCollection.countDocuments()
}
export async function findTotalCountOfAllProducts (){
    const products =  await productCollection.find({availability:'AVAILABLE'}).populate('category').exec()
    const totalCount = products.filter(products=>products.category.availability === 'ACTIVE').length
    return totalCount
}

export async function findProductCategoryFiltering (categoryName){
    try {
        const products = await productCollection.aggregate([
            {
                $match: {
                    availability: 'AVAILABLE'
                }
            },
            {
                $lookup: {
                    from: 'categories', // This should match the collection name for categories
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $match: {
                    'category.availability': 'ACTIVE',
                    'category.name': categoryName
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    price: 1,
                    availability: 1,
                    stock: 1,
                    imageUrl: 1,
                    createdAt: 1,
                    discount: 1,
                    discount_price: 1,
                    category: {
                        name: 1,
                        availability: 1
                    }
                }
            }
        ]);

        console.log(products,'category product is showing');
        return products;
    }catch(error){
        console.log(error,'find category filtering product func');
    }
}


export async function findSearchedProductForUserUsingRegex (name,skip,limit){
    return await productCollection.find(name).skip(skip).limit(limit)
}