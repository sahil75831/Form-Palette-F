"use client";

import ProtectedRoute from "@/utils/ProtectedRoute";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";

const F1page = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  // const userJson = localStorage.getItem("digiExcel_user");
  // let user = JSON.parse(userJson);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("digiExcel_user")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("digiExcel_user");
    router.replace("/login");
  };
  return (
    <ProtectedRoute>
      <button onClick={handleLogout} className="primaryButton mx-auto">
        Logout
      </button>
      <br />
      f1 page Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
      deserunt eveniet dolore velit beatae cupiditate, doloribus, sequi, commodi
      omnis assumenda quod numquam recusandae reprehenderit iste. Voluptatum
      voluptas vitae laudantium optio.
      <h1>{user?.name}</h1>
    </ProtectedRoute>
  );
};

export default F1page;
