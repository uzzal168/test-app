"use client";

import withAuth from "@/config/withAuth";
import { useAuth } from "@/context/AuthContext";
import { ProfileService } from "@/services/profile.service";
import { UserInfo } from "@/types/auth.type";
import { ToastService } from "@/utils/toast.service";
import { topProgress } from "@/utils/topProgress.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState, useEffect, FC } from "react";

const UserProfileEdit = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    topProgress.show();
    ProfileService.getUserProfile()
      .then((response) => {
        if (response.detail && user) {
          setfirstName(user.first_name);
          setlastName(user.last_name);
        } else {
          setfirstName(response.first_name);
          setlastName(response.last_name);
        }
      })
      .catch((err) => ToastService.error(err))
      .finally(() => {
        topProgress.hide();
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    topProgress.show();
    ProfileService.updateUserProfile({
      first_name: firstName,
      last_name: lastName,
    })
      .then((response) => {
        ToastService.success("Profile updated successfully!");
        router.push("/user/profile");
      })
      .catch((err) => ToastService.error(err))
      .finally(() => {
        topProgress.hide();
      });
  };

  return (
    <div className="centerView">
      <div className="card w-100 h-100">
        <div className="card-body image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              height="100"
              width="100"
            />
          </button>
          <form className="m-auto" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Edit Profile</h1>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control`}
                id="floatingFirstname"
                placeholder="First Name"
                autoFocus={false}
                required
                value={firstName}
                onChange={(event) => setfirstName(event.target.value)}
              />
              <label htmlFor="floatingFirstname">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control`}
                id="floatingLastName"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(event) => setlastName(event.target.value)}
              />
              <label htmlFor="floatingLastName">Last Name</label>
            </div>
            <div className="d-flex">
              <Link href={"/user/profile"} className="w-50 me-2">
                <button className="btn btn-danger w-100" type="button">
                  Cancle
                </button>
              </Link>
              <button
                className="btn btn-primary w-50"
                type="submit"
                disabled={firstName && lastName ? false : true}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserProfileEdit);
