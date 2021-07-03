import React from "react";
import { Start, Game, Result } from "../pages";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "../components";

const Routes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <Start />
        </Route>
        <Route exact path="/home/:bussiness/:gameId">
          <Start />
        </Route>
        <ProtectedRoute exact path="/game">
          <Game />
        </ProtectedRoute>
        <ProtectedRoute exact path="/result">
          <Result />
        </ProtectedRoute>
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
