"use client";

import React, { useState } from "react";
import css from "../RegisterForm/Register.module.scss";

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    organisation: false,
    password: false,
    phoneNumber: false,
  });
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    organisation: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_SERVERBASEURL}`;
    try {
      const response = await fetch(`${url}/authentication/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        setSuccessMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  return (
    <div className={css.RegisterForm}>
      <form onSubmit={(e) => handleSubmit(e)} className={css.wrapper}>
        <input
          type="text"
          placeholder="name"
          className={css.inputElement}
          value={formValues.name}
          onChange={(e) => handleChange(e)}
          name="name"
          required={true}
          onBlur={handleBlur}
          focused={focused.name.toString()}
          pattern="^[A-Za-z0-9\s]{3,16}$"
        />
        <span className="error-message">
          Name must be 3 - 16 characters long and dont containe any special
          characters
        </span>
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
          type="text"
          placeholder="organisation"
          className={css.inputElement}
          value={formValues.organisation}
          onChange={(e) => handleChange(e)}
          name="organisation"
          required={true}
          onBlur={handleBlur}
          focused={focused.organisation.toString()}
          pattern="^.{3,50}$"
        />
        <span className="error-message">
          Organisation Name must be 3 to 100 characters long.
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
        <input
          type="text"
          placeholder="Phone Number"
          className={css.inputElement}
          value={formValues.phoneNumber}
          onChange={(e) => handleChange(e)}
          name="phoneNumber"
          required={true}
          onBlur={handleBlur}
          focused={focused.phoneNumber.toString()}
          pattern="^[7-9]\d{9}$"
        />
        <span className="error-message">
          Phone number must be 10 digit long
        </span>

        <button className="primaryButton" type="submit">
          Sign Up
        </button>
        {successMessage && (
          <span className="green-message">
            Please click on the link sent to your email for verification.
          </span>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
