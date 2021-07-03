import db from "../firebase.config";
import moment from "moment";

export const useCustomer = () => {
  const handleCreateCoupon = async (customerId, prizeName) => {
    const response = await fetch("/.netlify/functions/create-cupon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  const handleCreatePrize = async (
    customerId,
    bussinessId,
    prizeName,
    prizeId,
    couponNumber
  ) => {
    return new Promise(async (resolve, reject) => {
      const expire_at = moment().add(7, "d").format("YYYY-MM-DD");
      const created_at = moment().format("YYYY-MM-DD");
      const coupon = {
        customerId: customerId,
        bussinessId: bussinessId,
        prizeId: prizeId,
        prizeName: prizeName,
        redem: false,
        couponNumber,
        created_at,
        expire_at,
      };

      const response = await db.collection("coupons").add(coupon);
      resolve({
        created: true,
        couponId: response.id,
      });
    });
  };

  const handleCreateCustomer = async (email) => {
    return new Promise(async (resolve, reject) => {
      const customer = {
        email,
      };

      const snapshot = await db
        .collection("customers")
        .where("email", "==", customer.email)
        .get();
      if (snapshot.empty) {
        const response = await db.collection("customers").add(customer);
        resolve({
          created: true,
          customerId: response.id,
        });
      } else {
        resolve({
          created: false,
        });
      }
    });
  };

  return {
    handleCreateCustomer,
    handleCreatePrize,
    handleCreateCoupon,
  };
};
