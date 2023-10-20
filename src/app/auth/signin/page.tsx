"use client";

import { AuthService } from "@/services/auth.service";
import * as React from "react";
import { useState, useEffect } from "react";
import { ToastService } from "@/utils/toast.service";
import { topProgress } from "@/utils/topProgress.service";
import { useRouter } from "next/navigation";
import { setItem } from "@/services/localStorage.service";
import { ACCESS_TOKEN } from "@/config/constants";
import { useAuth } from "@/context/AuthContext";

const AuthSignin = () => {
  const { user, login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    topProgress.show();
    AuthService.signin({
      username: username,
      password: password,
      app: 2,
    })
      .then((response) => {
        if (response?.token) {
          login(response);
          setItem(ACCESS_TOKEN, response?.token);
          router.push("/user/profile");
          ToastService.success("Login Successful!");
        } else {
          ToastService.error(response?.username);
        }
      })
      .catch((err) => ToastService.error(err))
      .finally(() => {
        topProgress.hide();
      });

    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
    console.log({ isAuthenticated });
  }, [isAuthenticated]);

  return (
    <div className="centerView">
      <form className="m-auto" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control`}
            id="floatingInput"
            autoFocus={false}
            placeholder="Username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control`}
            id="floatingPassword"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={username && password ? false : true}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default AuthSignin;
