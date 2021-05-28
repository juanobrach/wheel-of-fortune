import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { WheelOfFortune } from "./components";
import { useSpin } from "./hooks";
import { useHistory } from "react-router-dom";

export const Game = () => {
  const history = useHistory();

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
    if (options[selectedRandom].isWiiner) {
      // generate coupon for winner
    }
    history.push("/result");
  }, [history, options, selectedRandom]);

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
