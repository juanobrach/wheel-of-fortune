import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createCustomer } from "./graphql/mutations";
import { AuthContext, AuthContextProvider } from "./context";

import Routes from "./routes";
import "./styles.scss";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

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
        {" "}
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}
