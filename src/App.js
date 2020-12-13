import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import "./styles.scss";
import { Start, Game } from "./pages";

export default function App() {
  const location = useLocation();
  return (
    <AnimateSharedLayout type="crossfade">
      <div className="App">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Start} />
            <Route exact path="/game" component={Game} />
          </Switch>
        </AnimatePresence>
      </div>
    </AnimateSharedLayout>
  );
}
