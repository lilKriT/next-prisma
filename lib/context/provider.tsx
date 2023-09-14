"use client";

import React, { createContext, useContext, useState } from "react";

interface IAuthContext {
  testNumber: number | null;
  setTestNumber: React.Dispatch<React.SetStateAction<number>>;
}

const AuthContext = createContext<IAuthContext>({
  testNumber: 0,
  setTestNumber: () => {},
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [testNumber, setTestNumber] = useState<number>(0);

  return (
    <AuthContext.Provider value={{ testNumber, setTestNumber }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
