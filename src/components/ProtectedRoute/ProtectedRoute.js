import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  useEffect(() => {
    // if (!authContext.isAuth) {
    //   history.goBack();
    // }
  }, []);

  if (true) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  } else {
    history.goBack();
  }
};
