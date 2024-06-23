import { skip } from "node:test";
import { categoryCollection } from "../../model/category.mjs";
import { productCollection } from "../../model/product.mjs";


export async function findCategory() {
    return await categoryCollection.find().sort({ _id: -1 })
}

export async function findCountOfCategoryForAdmin() {
    return await categoryCollection.countDocuments()
}

export async function findAllActiveCategory() {
    return await categoryCollection.find({ availability: 'ACTIVE' })
}

export async function findUniqueCategoryUsingId(id) {
    return await categoryCollection.findById(id)
}

export async function findUniqueCategory(categoryName) {
    return await categoryCollection.findOne({ name: { $regex: new RegExp(categoryName, 'i') } })
}

export async function findRelatedProductAccordingToCategory (category){
    return await productCollection.find({availability:'ACTIVE',category}).populate('category')
}

export async function findAllProducts(skip, limit) {
    return await productCollection.find().skip(skip).limit(limit).sort({ _id: -1 }).populate('category')
}


export async function findSingleProduct(id) {
    return await productCollection.findById(id).populate('category')

}

export async function findSingleProductWithSameName(productName) {
    return await productCollection.findOne({ name: { $regex: new RegExp(productName, 'i') } })
}

export async function findAllProductsForUser(name, skip, limit) {
    return (await productCollection.find({ availability: 'ACTIVE', name: name }).skip(skip).limit(limit).populate('category')).filter(products => products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingLowToHigh(name, skip, limit) {
    return (await productCollection.find({ availability: 'ACTIVE', name: name }).sort({ discount_price: 1 }).skip(skip).limit(limit).populate('category')).filter(products => products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingHighToLow(name, skip, limit) {
    return (await productCollection.find({ availability: 'ACTIVE', name: name }).sort({ discount_price: -1 }).skip(skip).limit(limit).populate('category')).filter(products => products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingAtoZ(name, skip, limit) {
    return (await productCollection.find({ availability: 'ACTIVE', name: name }).sort({ name: 1 }).skip(skip).limit(limit).populate('category')).filter(products => products.category.availability === 'ACTIVE')
}

export async function findAllProductsForUserSortingZtoA(name, skip, limit) {
    return (await productCollection.find({ availability: 'ACTIVE', name: name }).sort({ name: -1 }).skip(skip).limit(limit).populate('category')).filter(products => products.category.availability === 'ACTIVE')
}

export async function findTotalCountOfAllProductsForAdmin() {
    return await productCollection.countDocuments()
}
export async function findTotalCountOfAllProducts() {
    const products = await productCollection.find({ availability: 'ACTIVE' }).populate('category').exec()
    const totalCount = products.filter(products => products.category.availability === 'ACTIVE').length
    return totalCount
}

export async function findProductCategoryFiltering(categoryName, sort) {
    try {
        // Define a sort object based on the sort parameter
        let sortOption = {};
        console.log(sort, 'sort is showing');
        if (sort === 'priceLowHigh') {
            sortOption = { discount_price: 1 };
        } else if (sort === 'priceHighLow') {
            sortOption = { discount_price: -1 };
        } else if (sort === 'A-Z') {
            sortOption = { name: 1 };
        } else if (sort === 'Z-A') {
            sortOption = { name: -1 };
        } else if (sort === 'default') {
            sortOption = { _id: 1 }
        }

        const products = await productCollection.aggregate([
            {
                $match: {
                    availability: 'ACTIVE'
                }
            },
            {
                $lookup: {
                    from: 'categories',
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
            },
            {
                $sort: sortOption
            }
        ])

        console.log(products, 'category product is showing');
        return products;
    } catch (error) {
        console.log(error, 'find category filtering product func');
    }
}


export async function findSearchedProductForUserUsingRegex(name, skip, limit) {
    return await productCollection.find(name).skip(skip).limit(limit)
}


export async function findAllProductsForUserHome(limit){
    return (await productCollection.find({ availability: 'ACTIVE'}).limit(limit).populate('category')).filter(products => products.category.availability === 'ACTIVE')

}