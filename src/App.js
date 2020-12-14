import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createCustomer } from "./graphql/mutations";
import { AuthContext, GameContext } from "./context";

import Routes from "./routes";
import "./styles.scss";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  const [coupon, setCoupon] = useState(null);
  const [prize, setPrize] = useState(null);
  const [result, setResult] = useState(null);

  const login = () => {
    setIsAuth(true);
  };

  console.log("userId:", userId);
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isAuth: isAuth,
          userId: userId,
          updateAuthStatus: login,
          setUserId,
        }}
      >
        <GameContext.Provider
          value={{
            coupon: coupon,
            prize: prize,
            result: result,
            setPrize: setPrize,
            setCoupon: setCoupon,
            setResult: setResult,
          }}
        >
          <Routes />
        </GameContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
