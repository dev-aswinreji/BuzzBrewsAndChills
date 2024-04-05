import { categoryCollection } from "../../model/category.mjs";
import { productCollection } from "../../model/product.mjs";

export async function insertCategoryForProducts(data) {
    return await categoryCollection.create([data])

}

export async function insertNewProducts(data) {
    const newdata = await productCollection.create([data])
    console.log(newdata)
}

