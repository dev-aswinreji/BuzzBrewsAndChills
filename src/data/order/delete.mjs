import { orderCollection } from "../../model/order.mjs";


async function deleteCancelProductFromOrderList (){


    await orderCollection.deleteOne({})

}