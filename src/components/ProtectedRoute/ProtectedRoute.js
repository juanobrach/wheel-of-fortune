import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../../context";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const { isAuth } = useContext(AuthContext);

  if (true) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  } else {
    history.goBack();
  }
};
