import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: false,
  userId: null,
  updateAuthStatus: () => {},
  setUserId: () => {},
});

export const GameContext = createContext({
  coupon: null,
  prize: null,
  result: null,
  setPrize: () => {},
  setCoupon: () => {},
  setResult: () => {},
});
