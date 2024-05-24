import { findUniqueCouponForUser } from "../../../data/coupon/find.mjs";
import { findUserUsingId } from "../../../data/users/find.mjs";
import { updateCouponInUserData } from "../../../data/users/update.mjs";
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs";

export const user_applyCoupon = async (req, res) => {
  try {
    const USER_ID = req.session.USER_ID;

    const couponCode = req.query.couponCode.trim();

    const totalCartPrice = Number(req.query.totalCartPrice);

    console.log(typeof totalCartPrice, "total price is shwoing");

    console.log(couponCode, "couponcode is shwoing");

    const coupon = await findUniqueCouponForUser(couponCode);

    console.log(coupon, "coupon data is showing");

    // console.log(coupon.minimum_cart_price, "minimum cart price is showing");

    const result = await checkDataDuplication(coupon);

    console.log(result, "result is showing ");

    if (result === "NOT EXIST") {

      res.json({ result: "Invalid Coupon" });

    } else if (10 >= totalCartPrice) {

      console.log("is it entering in else if case of totalcart price");

      res.json({ result: "Cart Limit Is Low" });

    } else if (result === "EXIST") {

     const discount = coupon.discount
     console.log(discount,'discount is showing');

      console.log(USER_ID, "user id is showing");

      const userData = await findUserUsingId(USER_ID);
        console.log(userData,'userData is showing');
      console.log(userData.coupon.length, "herhe");

      if (userData.coupon.length == 0) {

        const data = await updateCouponInUserData(USER_ID,couponCode)

        console.log(data,'updated user data is showing');
        res.json({result:'Coupon Applied',discount:discount})
        
    } else if (userData.coupon.length > 0) {
        console.log(couponCode,'hehe');
        
          const exists = userData.coupon.includes(couponCode)

          if(exists){
            res.json({result:'Coupon Already Exist'})
          }else{
            const data = await updateCouponInUserData(USER_ID,couponCode)

            console.log(data,'updated user data is showing');
            res.json({result:'Coupon Applied',discount:discount})
          }
          
      }
    }
  } catch (error) {
    console.log(error, "user apply coupon get");
    res.status(500).send("Internal Server Error");
  }
};

