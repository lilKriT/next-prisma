"use client";

import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<IAuthContext>({
  role: null,
  setRole: () => {},
  accessToken: null,
  setAccessToken: () => {},
});
// I can separate this into two files

const url = "http://localhost:3000";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true); // True or false?

  useEffect(() => {
    console.log("Provider effect happens here.");
    setIsLoading(true);

    const refresh = async () => {
      try {
        const res = await fetch(`${url}/api/users/refresh`, {
          method: "GET",
        });
        const json = await res.json();
        setRole(json.role);
        setAccessToken(json.accessToken);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!accessToken) {
      console.log("No access token, trying to refresh.");

      refresh();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ role, setRole, accessToken, setAccessToken }}
      >
        {!isLoading ? children : ""}
      </AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
