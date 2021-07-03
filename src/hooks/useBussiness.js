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

      await snapshot.docs.forEach(async () => {
        const query = await db
          .collectionGroup("games")
          .where("gameId", "==", gameId)
          .get();

        query.docs.forEach(async (games) => {
          const data = await games.data();
          resolve({
            prizes: data.prizes,
          });
        });
      });
    });
  };

  const handleCreateCoupon = async () => {
    const response = await fetch("/.netlify/functions/create-voucher", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  return {
    handleGetPrizes,
    handleCreateCoupon,
  };
};
