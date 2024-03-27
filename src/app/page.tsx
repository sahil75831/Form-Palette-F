import React from "react";

import AuthPage from "../uiComponents/auth/AuthPage";
import Link from "next/link";

const page = () => {
  return (
    <div>
      {/* <AuthPage
        type={"enterotp"}
        brandLogo={"https://digiexcel.in/wp-content/uploads/2023/02/logo.png"}
        brandName={"DigiExcel"}
      /> */}
      {/* <AuthPage
        type={"EmailVerificationMessage"}
        brandLogo={"https://digiexcel.in/wp-content/uploads/2023/02/logo.png"}
        brandName={"DigiExcel"}
      /> */}
      {/* */}
      <nav>
        <Link href={"/"} style={{ padding: "1rem" }}>
          Home page
        </Link>
        <Link href={"/login"} style={{ padding: "1rem" }}>
          login
        </Link>
        <Link href={"/register"} style={{ padding: "1rem" }}>
          register
        </Link>
      </nav>
    </div>
  );
};

export default page;
