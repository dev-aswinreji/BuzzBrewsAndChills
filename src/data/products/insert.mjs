import { productCollection } from "../../model/admin-entities/product.mjs";



export async function insertNewProducts (data){
    await productCollection.create([data])
}

