import React from "react";
import RegisterForm from "../auth/RegisterForm/RegisterForm";
import ResetPassword from "../auth/resetPassword/ResetPassword";
import ChangePassword from "../auth/resetPassword/changePassword/ChangePassword";
import css from "./Auth.module.scss";
import LoginForm from "./LoginForm/LoginForm";
import EnterOtp from "../../uiComponents/auth/enterOtp/EnterOtp";
import EmailVerificationMessage from "../auth/emailVerificationMessage/EmailVerificationMessage";

import Link from "next/link";

const AuthPage = ({ type, brandLogo, brandName }) => {
  let headContent = "";
  let subHeadContent = "";
  let formType = "";
  let textBelowButton = "";
  let bottomTextBelowButton = "";

  if (type === "register") {
    headContent = "Create an Account";
    subHeadContent = "Enter your credentials below to Create an Account";
    formType = <RegisterForm />;
    textBelowButton = (
      <>
        By clicking signup you agree to our
        <span>Terms of service</span>
        and
        <span>privacy policy</span>
      </>
    );
    bottomTextBelowButton = (
      <>
        Already have an account
        <Link href={"/login"}>
          <span>Login </span>
        </Link>
      </>
    );
  }
  if (type === "login") {
    headContent = "Login into your Account";
    subHeadContent = "Enter your credentials below to Login into your Account";
    formType = <LoginForm />;
    textBelowButton = (
      <>
        Create an account
        <Link href={"/register"} className="link">
          <span>Sign Up</span>
        </Link>
      </>
    );
    bottomTextBelowButton = (
      <Link href={"/resetPassword"} className="link">
        <span>Forget Password</span>?
      </Link>
    );
  }
  if (type === "enterotp") {
    headContent = "Account Verification";
    subHeadContent =
      "Enter the otp sent to you, below to make sure everything works fine";
    formType = <EnterOtp />;
  }
  if (type === "resetPassowrd") {
    headContent = "Reset Password";
    subHeadContent = "Your password will be reset by email";
    formType = <ResetPassword />;
    textBelowButton = (
      <Link href={"/login"}>
        Back to
        <span>Login</span>
      </Link>
    );
  }
  if (type === "changePassowrd") {
    headContent = "Reset Password";
    subHeadContent = "Your password will be reset by email";
    formType = <ChangePassword />;
    textBelowButton = (
      <Link href={"/login"}>
        Back to
        <span>Login</span>
      </Link>
    );
  }
  if (type === "EmailVerificationMessage") {
    formType = <EmailVerificationMessage />;
  }

  return (
    <div className={css.AuthPage}>
      <div className={css.conatiner}>
        <div className={css.sectionOne}>
          <div className={css.header}>{brandName}</div>
          <div className={css.logo}>
            <img src={brandLogo} alt="brand image" />
          </div>
          <div className={css.footer}>
            <span>&copy; {brandName} Privacy Policy and Cookies Policy</span>
          </div>
        </div>
        <div className={css.sectionTwo}>
          <div className={css.sectionTwo_wrapper}>
            <div className={css.sectionTwo_one}>
              <h1>{headContent}</h1>
              <span>{subHeadContent}</span>
            </div>
            <div className={css.sectionTwo_two}>
              {formType}
              <div className={css.sectionTwo_agreement}>{textBelowButton}</div>
              <div className={css.sectionTwo_login}>
                {bottomTextBelowButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
