import { updateCartTotalPriceWhileApplyingCoupon } from "../../../data/cart/update.mjs";
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
    // console.log(coupon.starting_date,'staring');
    // const couponStartingDate = new Date(coupon.starting_date)
    // const today = new Date()
    // console.log(couponStartingDate.getTime() >= today.getTime(),'kklads;fjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
    // console.log(new Date());
    // console.log(coupon.starting_date < new Date(),'what is the ouput');
    if (result === "NOT EXIST") {

      res.json({ result: "Invalid Coupon" });

    } else if (result === "EXIST") {



      const dateChecking1 = new Date(coupon.starting_date).toLocaleDateString('en-GB')
      const dateChecking2 = new Date(coupon.ending_date).toLocaleDateString('en-GB')

      console.log(dateChecking1, 'date is checking', dateChecking2, 'date checking success or not ');




      const discount = coupon.discount
      const discountPrice = totalCartPrice - (totalCartPrice * (discount / 100))

      console.log(discountPrice, 'discount price is showing');

      console.log(discount, 'discount is showing');

      console.log(USER_ID, "user id is showing");

      const userData = await findUserUsingId(USER_ID);
      console.log(userData, 'userData is showing');
      console.log(userData.coupon.length, "herhe");
      if (coupon.minimum_cart_price >= totalCartPrice) {

        console.log("is it entering in else if case of totalcart price");

        res.json({ result: "Cart Limit Is Low", amount: coupon.minimum_cart_price });

      } else if (coupon.starting_date >= new Date()) {
        res.json({ result: 'Coupon Not Found' })

      } else if (coupon.ending_date <= new Date()) {
        console.log('else if coupon expired');
        res.json({ result: 'Coupon Expired' })
      }
      else if (userData.coupon.length == 0) {

        const cartUpdated = await updateCartTotalPriceWhileApplyingCoupon(USER_ID, discountPrice, discount, couponCode)
        console.log(cartUpdated, 'cart updated or not');

        res.json({ result: 'Coupon Applied', discount: discount })

      } else if (userData.coupon.length > 0) {
        console.log(couponCode, 'hehe');

        const exists = userData.coupon.includes(couponCode)

        if (exists) {
          res.json({ result: 'Coupon Already Exist' })
        } else {

          const cartUpdated = await updateCartTotalPriceWhileApplyingCoupon(USER_ID, discountPrice, discount, couponCode)
          console.log(cartUpdated, 'cart updated or not');

          res.json({ result: 'Coupon Applied', discount: discount })
        }

      }
    }
  } catch (error) {
    console.log(error, "user apply coupon get");
    res.status(500).send("Internal Server Error");
  }
};

