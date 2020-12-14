import React, { useContext } from "react";
import { Win, Loss } from "./components";
import { GameContext } from "../../context";

export const Result = () => {
  const { coupon, prize } = useContext(GameContext);

  if (prize.isWiiner) {
    return <Win coupon={coupon} prize={prize} />;
  } else {
    return <Loss prize={prize} />;
  }
};
