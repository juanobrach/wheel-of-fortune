import React, { useContext, useEffect } from "react";
import { Win, Loss } from "./components";
import { GameContext } from "../../context";

export const Result = () => {
  const { prize } = useContext(GameContext);

  if (prize.isWiiner) {
    return <Win prize={prize} />;
  } else {
    return <Loss prize={prize} />;
  }
};
