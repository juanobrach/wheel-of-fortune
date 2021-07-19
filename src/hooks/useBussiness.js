import db from "../firebase.config";

export const useBussiness = () => {
  const handleGetPrizes = async (bussinessName, gameId) => {
    return new Promise(async (resolve, reject) => {
      const snapshot = await db
        .collection("businesses")
        .where("name", "==", bussinessName.replace("-", " "))
        .get();

      if (snapshot.empty) {
        return {
          prizes: false,
        };
      }

      await snapshot.docs.forEach(async (bussiness) => {
        const gamesCollection = await db
          .collection("businesses")
          .doc(bussiness.id)
          .collection("games")
          .where("gameId", "==", gameId)
          .get();
        gamesCollection.docs.forEach(async (game) => {
          const data = await game.data();
          resolve({
            prizes: data.prizes,
            bussinessId: bussiness.id,
          });
        });
      });
    });
  };

  const handleCreateCouponCode = async () => {
    const response = await fetch("/.netlify/functions/create-coupon-code", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  return {
    handleGetPrizes,
    handleCreateCouponCode,
  };
};
