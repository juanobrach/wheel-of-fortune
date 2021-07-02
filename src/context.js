import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  userId: null,
  bussinessId:null,
  updateAuthStatus: () => {},
  setUserId: () => {},
  setIsAuth: () => {},
  setBussinessId:() => {}
});

export const GameContext = createContext({
  coupon: null,
  prize: null,
  result: null,
  setPrize: () => {},
  setCoupon: () => {},
  setResult: () => {},
});
