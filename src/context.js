import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: false,
  userId: null,
  updateAuthStatus: () => {},
  setUserId: () => {},
});
