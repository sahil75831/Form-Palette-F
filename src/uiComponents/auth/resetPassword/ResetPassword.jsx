"use client";
import React, { useState } from "react";
import css from "./ResetPassword.module.scss";
import { useAuth } from "@/utils/AuthContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const auth = useAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_SERVERBASEURL;
    try {
      const response = await fetch(`${url}/authentication/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        // auth.user(email);
        localStorage.setItem("digiExcel_userEmail", email);
        console.log("response from reset api : ", await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={css.ResetPassword}>
      {email}
      <form onSubmit={(e) => handleSubmit(e)} className={css.wrapper}>
        <input
          type="email"
          placeholder="email"
          className={css.inputElement}
          value={email}
          onChange={(e) => handleChange(e)}
        />
        {/* <input
          type="password"
          placeholder="new password"
          className={css.inputElement}
        />
        <input
          type="password"
          placeholder="confirm password"
          className={css.inputElement}
        /> */}
        <button className="primaryButton">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
