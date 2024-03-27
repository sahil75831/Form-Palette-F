"use client";
import React, { useState } from "react";
import css from "./LoginForm.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";

const LoginForm = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();

  const [successMessage, setSuccessMessage] = useState(false);
  const [focused, setFocused] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_SERVERBASEURL}`;
    try {
      const response = await fetch(`${url}/authentication/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        setSuccessMessage(true);
        const data = await response.json();
        console.log("dataa : ", data);
        const userData = data.user;
        localStorage.setItem("digiExcel_user", JSON.stringify(userData));

        // auth.login(userData);
        router.push("/dashboard");
      } else {
        console.log("response.status : ", response.status);
        throw new Error("error in form submit during login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };
  return (
    <div className={css.LoginForm}>
      <form onSubmit={(e) => handleSubmit(e)} className={css.wrapper}>
        <input
          type="email"
          placeholder="email"
          className={css.inputElement}
          value={formValues.email}
          onChange={(e) => handleChange(e)}
          name="email"
          required={true}
          onBlur={handleBlur}
          focused={focused.email.toString()}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" // this will elemenate the double usage of @
        />
        <span className="error-message">
          It should be a valid email address
        </span>
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
        {/* <Link href={"/login/verification"}> */}

        <button className="primaryButton" type="submit">
          Login
        </button>
        {/* </Link> */}
      </form>
      {successMessage && (
        <span className="green-message">Login Successfull</span>
      )}
    </div>
  );
};

export default LoginForm;
