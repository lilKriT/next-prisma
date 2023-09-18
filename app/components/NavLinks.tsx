"use client";

import { useAuthContext } from "@/lib/context/provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const url = "http://localhost:3000";

const NavLinks = () => {
  const { role, setRole, setAccessToken } = useAuthContext();
  const router = useRouter();

  const onLogout = async () => {
    console.log("Logging out");
    try {
      const res = await fetch(`${url}/api/users/logout`);
      const json = await res.json();

      router.push("/");
      setRole("");
      setAccessToken("");

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <menu className="flex gap-2 justify-end">
      <li>
        <Link href={"/profile"} className="navLink" prefetch>
          Profile
        </Link>
      </li>
      {!role ? (
        <>
          <li>
            <Link href={"/login"} className="navLink" prefetch>
              Log In
            </Link>
          </li>
          <li>
            <Link href={"/register"} className="navLink" prefetch>
              Register
            </Link>
          </li>
        </>
      ) : (
        <li>
          <button onClick={onLogout} className="navLink">
            Logout
          </button>
        </li>
      )}
    </menu>
  );
};

export default NavLinks;
