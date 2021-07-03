export const useBussiness = () => {
    const handleGetPrizes = async (bussinessName, gameId) => {
      const response = await fetch("/.netlify/functions/get-prizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bussinessName,
            gameId
        }) // body data type must match "Content-Type" header
      });
  
      return response.json();
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
      handleCreateCoupon
    };
  };

  
  