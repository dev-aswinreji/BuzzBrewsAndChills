import { productCollection } from "../../model/product.mjs";



export async function updateProducts(id, data) {
    console.log(data, 'data is showing as false or not');
    console.log('getting into update products function');
    return await productCollection.findByIdAndUpdate(id, data)
}