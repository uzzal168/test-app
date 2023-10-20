"use client";
import { ACCESS_TOKEN } from "@/config/constants";
import { useAuth } from "@/context/AuthContext";
import { deleteItem, getItem } from "@/services/localStorage.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState, useEffect } from "react";

const NavBar = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  const handleSignout = () => {
    deleteItem(ACCESS_TOKEN);
    router.push("/");
    logout();
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          TestApp
        </Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            {isAuthenticated ? (
              <div className="d-flex align-items-center ">
                <Link className="nav-link me-3" href={"/user/profile"}>
                  Profile
                </Link>
                <a className="nav-link" onClick={handleSignout}>
                  Signout
                </a>
              </div>
            ) : (
              <Link className="nav-link" href={"/auth/signin"}>
                Signin
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
