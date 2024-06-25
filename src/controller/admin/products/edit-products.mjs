import { imageDirectory } from "../../../app.mjs";
import { deleteProductImageUsingFetch } from "../../../data/products/delete.mjs";
import fs from 'fs'

import {
  findCategory,
  findSingleProduct,
  findSingleProductWithSameName,
  findUniqueCategory,
} from "../../../data/products/find.mjs";
import { updateProducts } from "../../../data/products/update.mjs";
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs";
import { validateImage } from "../../../utils/validateImage.mjs";

export const admin_editProductsGet = async (req, res) => {
  try {
    if (req.session.isAdminAuthenticated) {
      const param = req.params.id;
      console.log(param);
      const product = await findSingleProduct(param);
      const category = await findCategory();
      console.log(product, "single product is logged ");
      const error = req.session.productErrorEdit;
      res.render("edit-products", { product, category, error });
    } else {
      res.redirect("/admin/signin");
    }
  } catch (error) {
    console.log(error, "ADMIN EDIT PRODUCTS GET");
  }
};

export const admin_editProductsPost = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.productId;
    const category = await findUniqueCategory(req.body.category);
    const productName = req.body.name.trim();
    const productData = await findSingleProduct(id);
    const isDuplicateProduct = await findSingleProductWithSameName(productName);
    const result = await checkDataDuplication(isDuplicateProduct);
    console.log(req.files, "req.files is showing below");
    console.log(req.body.imageUrl);


    let imageUrlMultiple = []
    let count = 0
    let imageValidating;
    if (req.files.length === 0) {
      imageUrlMultiple = []
    } else {

      for (const file of req.files) {

        imageValidating = await validateImage(file.path)

      }
      console.log(imageValidating);
      if (imageValidating) {
        for (const file of req.files) {

          imageUrlMultiple[count] = file.filename
          count++

        }
      } else {
        for (const file of req.files) {
          fs.unlinkSync(imageDirectory + '/' + file.filename, (err => {
            if (err) console.log('some error occured in admin delete product images ', err);
            else {
              console.log(imageDirectory + '/' + file.filename);
            }
          }))
        }
        req.session.productErrorEdit = 'Input file contains unsupported image format'
        return res.redirect(`/admin/edit-products/${id}`)
      }

    }



    // else{
    //   for (const imageUrl of req.body.old_imageUrl) {
    //     console.log(imageUrl,'image url ');
    //     imageUrlMultiple[count] = imageUrl
    //     count++;
    //   }
    // }
    const imageUrl = productData.imageUrl.push(...imageUrlMultiple)
    console.log(productData.imageUrl, 'updated or not');
    console.log(imageUrl, 'updated image url ');


    const categoryDiscount = category.discount
    console.log(categoryDiscount, 'category discount is showing ');

    const productDiscount = Number(req.body.discount) || 0

    const discount = categoryDiscount < productDiscount ? productDiscount : categoryDiscount
    console.log(discount, 'discount is showing');

    const price = Number(req.body.price)
    console.log(price, 'price is showing');

    const discount_price = price - (price * discount / 100)
    console.log(discount_price)


    console.log(imageUrlMultiple, 'image multiple is showing ');
    const updatedProductData = {
      name: req.body.name,
      description: req.body.name,
      price: req.body.price,
      category: category,
      stock: req.body.stock,
      imageUrl: productData.imageUrl,
      discount: productDiscount,
      discount_price: discount_price,

    };
    console.log(updatedProductData);
    if (productData.name === productName || result === "NOT EXIST") {
      try {
        await updateProducts(id, updatedProductData);
        res.redirect("/admin/products");
      } catch (error) {
        console.log(error, "Update Product Error");
      }
    } else {
      req.session.productErrorEdit = "product is already exist";
      res.redirect(`/admin/edit-products/${id}`);
    }
  } catch (error) {
    console.error(error, "ADMIN EDIT PRODUCTS POST");
    res.send(500);
  }
};

export const admin_deleteProductImages = async (req, res) => {
  try {

    const productId = req.query.productId;
    const imageUrl = req.query.filename;
    console.log(productId, imageUrl);
    await deleteProductImageUsingFetch(productId, imageUrl);
    fs.unlinkSync(imageDirectory + '/' + imageUrl, (err => {
      if (err) console.log('some error occured in admin delete product images ', err);
      else {
        console.log(imageDirectory + '/' + imageUrl);
      }
    }))
    res.json({ response: "success" });

  } catch (error) {
    console.log(error, 'ADMIN DELETE PRODUCT IMAGES');
  }
};
