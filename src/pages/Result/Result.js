import React, { useContext } from "react";
import { Win, Loss } from "./components";
import { GameContext } from "../../context";

export const Result = () => {
  const { prize, coupon } = useContext(GameContext);

  if (prize.win) {
    return <Win prize={prize} coupon={coupon} />;
  } else {
    return <Loss prize={prize} />;
  }
};
