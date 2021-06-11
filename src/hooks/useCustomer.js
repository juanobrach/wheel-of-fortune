import React, { useState, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context";

const CUSTOMERS_QUERY = gql`
  query getCustomerByEmail($email: String!) {
    customerByEmail(email: $email) {
      email
    }
  }
`;

const ADD_CUSTOMER = gql`
  mutation CreateCustomer($email: String!) {
    createCustomer(data: { email: $email }) {
      email
      _id
    }
  }
`;

const SAVE_CUSTOMER_PRIZE = gql`
  mutation CreateCoupon($customerId: ID!, $prizeName: String!) {
    createCoupon(data: { customerId: $customerId, prizeName: $prizeName }) {
      prizeName
      customerId
    }
  }
`;

export const useCustomer = () => {
  const [getCustomerByEmail, { loading, data: getCustomerByEmailResponse }] =
    useLazyQuery(CUSTOMERS_QUERY);

  const [addCustomer, { customerMutation, data: createCustomerResponse }] =
    useMutation(ADD_CUSTOMER);

  const [createCoupon, { prizeMutation, data: createPrizeResponse }] =
    useMutation(SAVE_CUSTOMER_PRIZE);

  useEffect(() => {
    if (
      getCustomerByEmailResponse &&
      !getCustomerByEmailResponse.customerByEmail
    ) {
    }
  }, [getCustomerByEmailResponse]);

  const handleGetGustomerByEmail = (email) => {
    getCustomerByEmail({
      variables: { email },
    });
  };

  const handleCreateCustomer = (email) => {
    addCustomer({
      variables: { email },
    });
  };

  const handleCreateCoupon = (customerId, prizeName) => {
    createCoupon({
      variables: { customerId, prizeName },
    });
  };

  return {
    handleGetGustomerByEmail,
    handleCreateCustomer,
    getCustomerByEmailResponse,
    createCustomerResponse,
    handleCreateCoupon,
    createPrizeResponse,
  };
};
