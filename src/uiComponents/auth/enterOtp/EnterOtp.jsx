"use client";
import React, { useRef, useState } from "react";
import css from "./EnterOtp.module.scss";

const EnterOtp = () => {
  const [otpMessage, setOtpMessage] = useState(false);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const submitButtonRef = useRef(null);

  const handleKeyDown = (e, reference, isLastInput) => {
    if (e.key >= 0 && e.key <= 9) {
      setTimeout(() => {
        if (!isLastInput) {
          return reference.current.focus();
        }
      }, 10);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpArray = [
      inputRef1.current.value,
      inputRef2.current.value,
      inputRef3.current.value,
      inputRef4.current.value,
      inputRef5.current.value,
      inputRef6.current.value,
    ];
    const otp = otpArray.join("");
    if (otp.length === 6) {
      const url = `${process.env.NEXT_PUBLIC_SERVERBASEURL}`;
      const response = await fetch(`${url}/authentication/verifyOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpSendByUser: otp }),
      });
      if (response.ok) {
        setOtpMessage(true);
        console.log("response after sending otp : ", await response.json());
      }
    } else {
      setOtpMessage(false);
    }
  };
  return (
    <form className={css.wrapper} onSubmit={(e) => handleSubmit(e)}>
      <div className={css.container}>
        <input
          type="text"
          className={css.inputElement}
          ref={inputRef1}
          onKeyDown={(e) => handleKeyDown(e, inputRef2, false)}
        />
        <input
          className={css.inputElement}
          ref={inputRef2}
          onKeyDown={(e) => handleKeyDown(e, inputRef3, false)}
        />
        <input
          type="text"
          className={css.inputElement}
          ref={inputRef3}
          onKeyDown={(e) => handleKeyDown(e, inputRef4, false)}
        />
        <input
          type="text"
          className={css.inputElement}
          ref={inputRef4}
          onKeyDown={(e) => handleKeyDown(e, inputRef5, false)}
        />
        <input
          type="text"
          className={css.inputElement}
          ref={inputRef5}
          onKeyDown={(e) => handleKeyDown(e, inputRef6, false)}
        />
        <input
          type="text"
          className={css.inputElement}
          ref={inputRef6}
          onKeyDown={(e) => handleKeyDown(e, inputRef6, true)}
        />
      </div>
      <button className="primaryButton" ref={submitButtonRef} type="submit">
        Verify
      </button>
      {/* {otpMessage === true ? (
        <h6 className={css.otpMessage}> heelo helo{otpMessage}</h6>
      ) : (
        <h6 className={css.otpMessage}> world helo{otpMessage}</h6>
      )} */}
    </form>
  );
};

export default EnterOtp;
