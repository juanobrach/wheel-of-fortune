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

  const handleCreatePrize = async (customerId, prizeName) => {
    const response = await fetch("/.netlify/functions/prize-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        prizeName,
      }),
    });

    return response.json();
  };

  const handleCreateCustomer = async (email) => {
    const response = await fetch("/.netlify/functions/customer-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    return response.json();
  };

  return {
    handleCreateCustomer,
    handleCreatePrize,
    handleCreateCoupon,
  };
};
