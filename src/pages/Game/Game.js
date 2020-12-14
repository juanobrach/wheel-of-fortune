import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { API, graphqlOperation } from "aws-amplify";
import { createCoupon } from "../../graphql/mutations";
import { WheelOfFortune, Modal } from "./components";
import { useSpin } from "./hooks";
import { AuthContext } from "../../context";
import { Route, useHistory } from "react-router-dom";

export const Game = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const {
    startRotationDegrees,
    finalRotationDegrees,
    getRouletteClass,
    setMustStartSpinning,
    options,
    selectedRandom,
    coupon,
    gameIsOver,
  } = useSpin();

  useEffect(() => {
    if (gameIsOver === null) return;
    getScoreAndOver();
  }, [gameIsOver]);

  const getScoreAndOver = async () => {
    if (options[selectedRandom].isWiiner) {
      const result = await API.graphql(
        graphqlOperation(createCoupon, {
          input: {
            customerId: authContext.userId,
            prizeNumber: selectedRandom,
          },
        })
      );
    }
    history.push("/result");
  };

  useEffect(() => {
    setMustStartSpinning(true);
  }, []);

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

      {/* {showModal ?? (
        <Modal coupon={coupon} selectedOption={options[selectedRandom].name} />
      )} */}
    </motion.div>
  );
};
