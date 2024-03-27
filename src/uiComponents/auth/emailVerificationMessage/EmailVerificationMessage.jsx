"use client";
import React, { useEffect, useState } from "react";
import css from "./EmailVerificationMessage.module.scss";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const EmailVerificationMessage = () => {
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVERBASEURL}/authentication/verifyAccount`;
    const verifyAccount = async () => {
      const id = searchParams.get("id");

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const linkClickedStatus = await response.json();
      setIsLinkClicked(linkClickedStatus.message);
      console.log(linkClickedStatus.message);
    };
    verifyAccount();
  }, [isLinkClicked]);

  return (
    <div className={css.EmailVerificationMessage}>
      <div className={css.wrapper}>
        {isLinkClicked === false ? (
          "loading"
        ) : (
          <>
            <h1>&#x2713;</h1>
            <h2>Email Verification</h2>
            <span>
              Your email has been verefied. You can continue using the
              application
            </span>
            <Link href={"/"}>
              <button className="primaryButton">Go to Application</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationMessage;
