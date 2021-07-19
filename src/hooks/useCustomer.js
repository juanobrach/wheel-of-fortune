import db from "../firebase.config";
import moment from "moment";

export const useCustomer = () => {
  const createPrize = async (
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
        expirationDate: expire_at,
      });
    });
  };

  const handleCreateCustomer = async (bussinessName, email) => {
    return new Promise(async (resolve, reject) => {
      const snapshot = await db
        .collection("businesses")
        .where("name", "==", bussinessName.replace("-", " "))
        .get();

      await snapshot.docs.forEach(async (bussiness) => {
        const bussinessRef = await db
          .collection("businesses")
          .doc(bussiness.id);

        const customers = await bussinessRef
          .collection("customers")
          .where("email", "==", email)
          .get();
        if (customers.empty) {
          const customerID = await bussinessRef.collection("customers").add({
            email,
          });
          resolve({
            created: true,
            customerId: customerID.id,
          });
        } else {
          resolve({
            created: false,
          });
        }
      });
    });
  };

  return {
    handleCreateCustomer,
    createPrize,
  };
};
