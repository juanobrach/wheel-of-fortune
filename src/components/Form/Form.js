import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export const Form = () => {
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  const validateEmail = (email) => {
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") == -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Input
        variants={inputVariants}
        type="email"
        placeholder="your@email.com"
        animate="visible"
        initial="initial"
        exit="exit"
        onChange={(e) => validateEmail(e.target.value)}
      />
      <Button
        disabled={isDisabled}
        animate="visible"
        initial="initial"
        exit="exit"
        variants={ButtonVariants}
        key={"button"}
        onClick={() => history.push("/game")}
      >
        Spin the wheel!
      </Button>
    </>
  );
};

const inputVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const ButtonVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    opacity: 0,
    y: 1000,
  },
};

const Button = styled(motion.button)`
  ${(props) =>
    props.disabled ??
    css`
      opacity: 0.5;
    `}
  color: #776fba;
  font-size: 16px;
  font-weight: bold;
  font-family: Tahoma, sans-serif;
  line-height: 22px;
  text-decoration: none;
  background-color: #e6e5f5;
  text-transform: uppercase;
  white-space: normal !important;
  text-align: center;
  padding: 14px 40px !important;
  margin: 20px 0 5px !important;
  border-radius: 72px;
  border-color: transparent;
`;

const Input = styled(motion.input)`
  outline-style: none;
  color: white;
  width: 90vw;
  background: #7978c8;
  border-radius: 1.25em;
  border-color: transparent;
  height: 5em;
  text-align: center;
  ::placeholder {
    color: white;
  }
`;
