import { categoryCollection } from "../../model/category.mjs";
import { productCollection } from "../../model/product.mjs";

export async function updateProductOfferAccordingToCategoryUpdate(categoryId) {
  const category = await categoryCollection.findById(categoryId);
  const products = await productCollection.find({ category: categoryId });
  for (const product of products) {
    const amount =
      category.discount > product.discount
        ? product.price - (product.price * category.discount) / 100
        : product.price - (product.price * product.discount) / 100
    console.log(amount, "amount is showing ");
    const result = await productCollection.findByIdAndUpdate(product._id, {
      discount_price: amount,
    });
    console.log(result, "result is showing put hand in mine");
  } 
}
