import React, { useEffect, useState } from "react";
import { WheelOfFortune, Modal } from "../components";
import { useSpin } from "../components/WheelOfFortune/hooks";
import { motion } from "framer-motion";
import { randomOption } from "../utils";

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
  const [showModal, setShowModal] = useState(false);

  const {
    startRotationDegrees,
    finalRotationDegrees,
    getRouletteClass,
    setMustStartSpinning,
    options,
    selectedRandom,
  } = useSpin(setShowModal);

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
      {showModal ?? <Modal selectedOption={options[selectedRandom]} />}
    </motion.div>
  );
};
