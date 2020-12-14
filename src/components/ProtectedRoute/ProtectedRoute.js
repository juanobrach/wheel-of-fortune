import React, { useEffect, useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "./../../context";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!authContext.isAuth) {
      history.goBack();
    }
  }, []);

  if (true) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  } else {
    history.goBack();
  }
};
