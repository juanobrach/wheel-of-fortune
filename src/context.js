import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: false,
  token: null,
  updateAuthStatus: () => {},
});
