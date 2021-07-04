import React, { useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { WheelOfFortune } from "./components";
import { useSpin } from "./hooks";
import { useHistory } from "react-router-dom";
import { AuthContext, GameContext } from "../../context";
import { useCustomer } from "../../hooks";

export const Game = () => {
  const history = useHistory();
  const { userId, bussinessId } = useContext(AuthContext);
  const { setPrize, setExpirationDate, coupon } = useContext(GameContext);
  const { handleCreatePrize } = useCustomer();
  const {
    startRotationDegrees,
    finalRotationDegrees,
    getRouletteClass,
    setMustStartSpinning,
    options,
    selectedRandom,
    gameIsOver,
  } = useSpin();

  const getScoreAndOver = useCallback(async () => {
    if (options[selectedRandom].win) {
      // generate coupon for winner
      setPrize(options[selectedRandom]);
      const prize = await handleCreatePrize(
        userId,
        bussinessId,
        options[selectedRandom].name,
        selectedRandom,
        coupon
      );
      setExpirationDate(prize.expirationDate);
    }
    history.push("/result");
  }, [
    history,
    options,
    selectedRandom,
    userId,
    bussinessId,
    handleCreatePrize,
    setPrize,
    setExpirationDate,
    coupon,
  ]);

  useEffect(() => {
    if (gameIsOver === null) return;
    getScoreAndOver();
  }, [gameIsOver, getScoreAndOver]);

  useEffect(() => {
    setMustStartSpinning(true);
  }, [setMustStartSpinning]);
  return (
    <motion.div key="game" className="wof-form-container">
      <motion.div>
        <WheelOfFortune
          className={getRouletteClass()}
          options={options}
          startRotationDegrees={startRotationDegrees}
          finalRotationDegrees={finalRotationDegrees}
        />
      </motion.div>
    </motion.div>
  );
};
