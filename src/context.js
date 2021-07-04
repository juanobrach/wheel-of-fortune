import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  userId: null,
  bussinessId: null,
  updateAuthStatus: () => {},
  setUserId: () => {},
  setIsAuth: () => {},
  setBussinessId: () => {},
});

export const GameContext = createContext({
  coupon: null,
  prize: null,
  prizes: null,
  result: null,
  expirationDate: null,
  setExpirationDate: () => {},
  setPrize: () => {},
  setPrizes: () => {},
  setCoupon: () => {},
  setResult: () => {},
});
