"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userJson = localStorage.getItem("digiExcel_user");
    console.log("userJson    ", userJson);
    setIsAuthenticated(() => {
      return !!userJson;
    });

    console.log("isAuthenticated :useEffect 1>> ", isAuthenticated); // why this false

    if (!userJson) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    console.log("isAuhtnetucated :3 :useEffect 2>> ", isAuthenticated);
  }, [isAuthenticated]);

  console.log("isAuthenticated :2 component render ", isAuthenticated); // why this true
  return isAuthenticated ? <div>{children}</div> : null; // or a loading indicator
};

export default ProtectedRoute;
