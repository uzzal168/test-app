"use client";

import withAuth from "@/config/withAuth";
import { useAuth } from "@/context/AuthContext";
import { ProfileService } from "@/services/profile.service";
import { UserInfo } from "@/types/auth.type";
import { ToastService } from "@/utils/toast.service";
import { topProgress } from "@/utils/topProgress.service";
import Link from "next/link";
import * as React from "react";
import { useState, useEffect, FC } from "react";

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setuserData] = useState<UserInfo>();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    topProgress.show();
    ProfileService.getUserProfile()
      .then((response) => {
        if (response?.detail) {
          user && setuserData(user);
        } else {
          setuserData(response);
        }
      })
      .catch((err) => ToastService.error(err))
      .finally(() => {
        topProgress.hide();
      });
  };

  const formateDate = (value: any) => {
    const date = new Date(value);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="centerView">
      <div className="card w-100 h-100">
        {userData ? (
          <div className="card-body image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                height="100"
                width="100"
              />
            </button>
            <span className="name mt-3">{`${userData?.full_name}`}</span>
            <span className="idd">{userData?.email}</span>
            <div className=" d-flex mt-2">
              <Link href={"/user/profile/edit"}>
                <button className="btn btn-dark">Edit Profile</button>
              </Link>
            </div>

            <div className=" px-2 rounded mt-4 date ">
              <span className="join">Joined: </span>
              <span className="join">{formateDate(userData?.join_date)}</span>
            </div>
          </div>
        ) : (
          <div className="text-center">Loading ... </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(UserProfile);
