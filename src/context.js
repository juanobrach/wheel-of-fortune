import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  userId: null,
  updateAuthStatus: () => {},
  setUserId: () => {},
  setIsAuth: () => {},
});

export const GameContext = createContext({
  coupon: null,
  prize: null,
  result: null,
  setPrize: () => {},
  setCoupon: () => {},
  setResult: () => {},
});
