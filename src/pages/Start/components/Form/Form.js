import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { API, graphqlOperation } from "aws-amplify";
import { listCustomers } from "../../../../graphql/queries";
import { createCustomer } from "../../../../graphql/mutations";

import { AuthContext, AuthContextProvider } from "../../../../context";

export const Form = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    validateEmail(customerEmail);
  }, [customerEmail]);

  const startGame = async () => {
    console.log("generate a customer");
    const result = await API.graphql(
      graphqlOperation(createCustomer, {
        input: {
          email: customerEmail,
        },
      })
    );
    console.log("user:", result);
    authContext.setUserId(result.data.createCustomer.id);
    authContext.updateAuthStatus();
    history.push("/game");
  };

  const submit = async () => {
    //authContext.updateAuthStatus();
    const query = await API.graphql(
      graphqlOperation(listCustomers, {
        filter: {
          email: {
            eq: customerEmail,
          },
        },
      })
    );
    console.log("query:", query);
    if (query.data.listCustomers.items.length) {
      let customer = query.data.listCustomers.items[0];
    } else {
      startGame();
    }
  };

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
        onChange={(e) => setCustomerEmail(e.target.value)}
      />
      <Button
        disabled={isDisabled}
        animate="visible"
        initial="initial"
        exit="exit"
        variants={ButtonVariants}
        key={"button"}
        onClick={submit}
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
