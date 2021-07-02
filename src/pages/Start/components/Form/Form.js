import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { useHistory,useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCustomer } from "../../../../hooks";
import { AuthContext } from "../../../../context";

export const Form = () => {
  const history = useHistory();
  const { bussiness } = useParams();
  const { setUserId, setIsAuth, setBussinessId } = useContext(AuthContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const [customerEmail, setCustomerEmail] = useState("");
  const { handleCreateCustomer } = useCustomer();

  useEffect(() => {
    validateEmail(customerEmail);
  }, [customerEmail]);

  const startGame = () => {
    history.push("/game");
  };

  useEffect(()=>{
    setBussinessId(bussiness)
  },[bussiness])

  const submit = async () => {
    const response = await handleCreateCustomer(customerEmail);
    if (response.created) {
      setUserId(response.customerId);
      setIsAuth(true);
      startGame();
    } else {
      notify();
    }
  };

  const validateEmail = (email) => {
    let lastAtPos = email.lastIndexOf("@");
    let lastDotPos = email.lastIndexOf(".");
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
    } else {
      setIsDisabled(false);
    }
  };

  const notify = () => toast("Lo sentimos, solo puedes participar una vez");

  return (
    <>
      <InputContainer>
        <Input
          variants={inputVariants}
          type="email"
          placeholder="tu@correo.com"
          animate="visible"
          initial="initial"
          exit="exit"
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </InputContainer>
      <Button
        disabled={isDisabled}
        animate="visible"
        initial="initial"
        exit="exit"
        variants={ButtonVariants}
        key={"button"}
        onClick={submit}
      >
        Comenzar
      </Button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
    y: 100,
  },
  visible: {
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 1000,
  },
};

const Button = styled(motion.button)`
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
  :hover {
    background: #776fba;
    color: #e6e5f5;
    transition: 0.3s;
  }
  cursor: pointer;
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
  max-width: 500px;
  border-radius: 1.25em;
  border-color: transparent;
  height: 5em;
  text-align: center;
  ::placeholder {
    color: white;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;
