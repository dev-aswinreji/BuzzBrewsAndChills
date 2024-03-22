import { productCollection } from "../../model/product.mjs";



export async function insertNewProducts (data){
    await productCollection.create([data])
}

