import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { AuthContext, GameContext } from "./context";
import { client } from "./client";

import Routes from "./routes";
import "./styles.scss";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [bussinessId, setBussinessId] = useState(null);



  const [coupon, setCoupon] = useState(null);
  const [prize, setPrize] = useState(null);
  const [result, setResult] = useState(null);

  const login = () => {
    setIsAuth(true);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AuthContext.Provider
          value={{
            isAuth: isAuth,
            userId: userId,
            bussinessId: bussinessId,
            setBussinessId,
            updateAuthStatus: login,
            setUserId,
            setIsAuth,
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
    </ApolloProvider>
  );
}
