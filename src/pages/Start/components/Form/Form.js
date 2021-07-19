import React, { useState, useEffect, useContext, useCallback } from "react";
import styled, { css } from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useCustomer, useBussiness } from "../../../../hooks";
import { AuthContext, GameContext } from "../../../../context";

export const Form = () => {
  const history = useHistory();
  const { bussiness, gameId } = useParams();
  const { setUserId, setIsAuth, setBussinessId } = useContext(AuthContext);
  const { setPrizes, prizes } = useContext(GameContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { handleGetPrizes } = useBussiness();

  const [customerEmail, setCustomerEmail] = useState("");
  const { handleCreateCustomer } = useCustomer();

  useEffect(() => {
    validateEmail(customerEmail);
  }, [customerEmail]);

  const startGame = () => {
    history.push("/game");
  };

  const getPrizes = useCallback(async () => {
    const response = await handleGetPrizes(bussiness, gameId);
    if (!response) return;
    if (response.prizes) {
      setPrizes(response.prizes);
      setBussinessId(response.bussinessId);
    }
  }, [handleGetPrizes, setPrizes, bussiness, gameId, setBussinessId]);

  useEffect(() => {
    if (prizes) return;
    getPrizes();
  }, [getPrizes, prizes]);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await handleCreateCustomer(bussiness, customerEmail);
    if (response.created) {
      setUserId(response.customerId);
      setIsAuth(true);
      startGame();
    } else {
      notify();
    }
    setIsLoading(false);
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
    <form onSubmit={submit}>
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
        type={"submit"}
      >
        {!isLoading ? (
          "Comenzar"
        ) : (
          <Loader type="Puff" color="#00BFFF" height={20} width={20} />
        )}
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
    </form>
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
  max-height: 54px;
  min-width: 186px;
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
