import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listBlogs } from "./graphql/queries";
import { AuthContext, AuthContextProvider } from "./context";

import Routes from "./routes";
import "./styles.scss";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    createBlog();
  }, [createBlog]);

  const createBlog = async () => {
    //  await API.graphql(graphqlOperation(listBlogs));
  };

  const login = () => {
    setIsAuth(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isAuth: isAuth,
          token: null,
          updateAuthStatus: login,
        }}
      >
        {" "}
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}
