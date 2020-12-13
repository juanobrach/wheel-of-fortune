import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Form } from "../components";

const containerVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    transition: {
      duration: 0.6,
    },
  },
};

const titleVariants = {
  initial: {
    y: -10,
  },
  visible: {
    y: 0,
  },
  exit: {
    y: -200,
    transition: {
      duration: 0.6,
    },
  },
};

export const Start = () => {
  return (
    <Container
      key="intro"
      animate="visible"
      initial="initial"
      variants={containerVariants}
    >
      <Title
        key="title"
        animate="visible"
        initial="initial"
        exit="exit"
        variants={titleVariants}
      >
        Try your Luck
      </Title>
      <Form />
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
`;

const Title = styled(motion.h1)`
  color: #5e5d9b;
  font-size: 2em;
  font-weight: bold;
`;
