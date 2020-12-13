import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { API, graphqlOperation } from "aws-amplify";
import { createCoupon } from "../../graphql/mutations";
import { WheelOfFortune, Modal } from "./components";
import { useSpin } from "./hooks";
import { AuthContext } from "../../context";

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      // On Tap - Navigation
      type: "spring",
      stiffness: 500,
      damping: 90,
      mass: 1,
      duration: 1,
    },
  },
  exit: {
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const Game = () => {
  const authContext = useContext(AuthContext);

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
      console.log("result:", result);
      setShowModal(true);
    }
  };

  useEffect(() => {
    setMustStartSpinning(true);
  }, []);

  return (
    <motion.div
      key="game"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="wof-form-container"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        <WheelOfFortune
          className={getRouletteClass()}
          options={options}
          startRotationDegrees={startRotationDegrees}
          finalRotationDegrees={finalRotationDegrees}
        />
      </motion.div>

      {showModal ?? (
        <Modal coupon={coupon} selectedOption={options[selectedRandom].name} />
      )}
    </motion.div>
  );
};
