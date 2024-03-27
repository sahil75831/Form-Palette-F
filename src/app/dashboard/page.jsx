"use client";

import ProtectedRoute from "../../utils/ProtectedRoute";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";

const Dashboardpage = () => {
  const auth = useAuth();
  console.log("auth dahsbord page : ", auth);
  return (
    <>
      <ProtectedRoute>
        hello {auth.user?.name}
        <Link href={"/dashboard/f1"}>go to f1</Link>
      </ProtectedRoute>
    </>
  );
};

export default Dashboardpage;
