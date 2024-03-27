"use client";
import React, { useState } from "react";
import css from "../ResetPassword.module.scss";
import { useAuth } from "@/utils/AuthContext";
import { useSearchParams } from "next/navigation";

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [email, setEmail] = useState(
    localStorage.getItem("digiExcel_userEmail")
  );

  const [formValues, setFormValues] = useState({
    password: "",
    confirmpassword: "",
  });

  const [focused, setFocused] = useState({
    password: false,
    confirmpassword: false,
  });
  // const auth = useAuth();

  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_SERVERBASEURL;
    try {
      const response = await fetch(`${url}/authentication/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          password: formValues.password,
          confirmpassword: formValues.confirmpassword,
        }),
      });
      console.log("response from reset api : ", await response.json());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={css.ResetPassword}>
      {formValues.password}
      {formValues.confirmpassword}
      <form onSubmit={(e) => handleSubmit(e)} className={css.wrapper}>
        <input
          type="email"
          placeholder="email"
          className={css.inputElement}
          value={email}
          disabled={true}
          style={{ cursor: "not-allowed" }}
        />

        <input
          type="password"
          placeholder="password"
          className={css.inputElement}
          value={formValues.password}
          onChange={(e) => handleChange(e)}
          name="password"
          required={true}
          onBlur={handleBlur}
          focused={focused.password.toString()}
          pattern="(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$"
        />
        <span className="error-message">
          Password should be least 8 characters long, min 1 Uppercase, 1
          Lowercase, 1 Number, 1 special character and only contains symbols
          from the alphabet.
        </span>
        <input
          type="password"
          placeholder="confirm password"
          className={css.inputElement}
          onChange={(e) => handleChange(e)}
          value={formValues.confirmpassword}
          name="confirmpassword"
          required={true}
          onBlur={handleBlur}
          focused={focused.confirmpassword.toString()}
          pattern={formValues.password}
        />
        <span className="error-message">
          Password should be least 8 characters long, min 1 Uppercase, 1
          Lowercase, 1 Number, 1 special character and only contains symbols
          from the alphabet.
        </span>
        <button className="primaryButton">Reset Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
