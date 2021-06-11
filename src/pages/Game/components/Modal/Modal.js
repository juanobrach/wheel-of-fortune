import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const contentVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const Modal = ({ selectedOption, coupon }) => {
  return (
    <ModalOverlay
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
    >
      <ModalContent
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={contentVariants}
      >
        <Title>Tienes muy buena suerte, tu premio: </Title>
        <Result>{selectedOption}</Result>
      </ModalContent>
    </ModalOverlay>
  );
};

const Title = styled.span`
  font-size: 14px;
  display: block;
  margin-bottom: 1em;
  font-weight: bold;
`;
const Result = styled.span`
  font-size: 50px;
  font-weight: bold;
  display: block;
  margin-bottom: 23px;
`;

const ModalOverlay = styled(motion.div)`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999999999;
  display: flex;
`;

const ModalContent = styled(motion.div)`
  color: #48546c;
  background: white;
  width: 90%;
  margin: auto;
  border-radius: 30px;
  height: 40%;
  padding: 2em;
`;
