import { cartCollection } from "../../model/cart.mjs";

export async function insertCartData (cartData){
    return await cartCollection.create([cartData])
}