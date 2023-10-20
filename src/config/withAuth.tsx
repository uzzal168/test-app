"use client";

import { getItem } from "@/services/localStorage.service";
import { useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";
import { ACCESS_TOKEN } from "./constants";

const withAuth = (Component: FC) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const token = getItem(ACCESS_TOKEN);

    useEffect(() => {
      if (!token) {
        router.push("/auth/signin");
      }
    }, [token]);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
