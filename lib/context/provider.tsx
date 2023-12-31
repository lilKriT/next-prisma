"use client";

import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string>>;
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<IAuthContext>({
  id: null,
  setId: () => {},
  name: null,
  setName: () => {},
  role: null,
  setRole: () => {},
  accessToken: null,
  setAccessToken: () => {},
});
// I can separate this into two files

const url = process.env.NEXT_PUBLIC_URL;

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true); // True or false?

  useEffect(() => {
    console.log("Provider effect happens here.");

    const refresh = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const res = await fetch(`${url}/api/users/refresh`, {
          method: "GET",
        });
        const json = await res.json();
        setId(json.id);
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
  }, [accessToken]);

  return (
    <>
      <AuthContext.Provider
        value={{
          id,
          setId,
          name,
          setName,
          role,
          setRole,
          accessToken,
          setAccessToken,
        }}
      >
        {/* {!isLoading ? children : ""} */}
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
