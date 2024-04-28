import { cartCollection } from "../../model/cart.mjs";


export async function updateCartDatas (id,productId){
    const data = await cartCollection.updateOne({userId:id,"items.productId":productId},{$inc:{'items.$.quantity':1,totalPrice:1}})
    console.log(data,'updated data is showing');
}

export async function updateCartDataOfTotalPrice (id,productId,totalPrice){
    const cartData = await cartCollection.updateOne({userId:id,"items.productId":productId},{$addToSet:{totalPrice:totalPrice}})
    console.log(cartData,'updated cart data price is showing');
}