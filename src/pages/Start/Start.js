import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Form } from "./components";

const containerVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {},
};

const illustrationVariants = {
  initial: {
    opacity: 0,
    width: "100%",
  },
  visible: {
    opacity: 1,
  },
  exit: {
    y: -300,
  },
};

const titleVariants = {
  initial: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
    },
  },
  exit: {
    y: -100,
    transition: {
      type: "spring",
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
      <motion.div
        key="intro"
        animate="visible"
        initial="initial"
        exit="exit"
        variants={illustrationVariants}
      >
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src="https://assets9.lottiefiles.com/packages/lf20_FrS7ei.json"
          style={{ height: "200px", width: "90%" }}
        ></Player>
      </motion.div>
      <Title
        key="title"
        animate="visible"
        initial="initial"
        exit="exit"
        variants={titleVariants}
      >
        Prueba tu Suerte!
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
  height: 100%;
`;

const Title = styled(motion.h1)`
  color: #5e5d9b;
  font-size: 2em;
  font-weight: bold;
`;
