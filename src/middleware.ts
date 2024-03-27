export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface CustomNextRequest extends NextRequest {
  loggedInUserId?: string;
}
export async function middleware(req: CustomNextRequest, res: NextResponse) {
  // const token = req.cookies.get("jwt_auth");
  // const secretKey = process.env.JWT_SECRET_KEY;
  // const encoder = new TextEncoder();
  // const keyAsUint8Array = encoder.encode(secretKey);
  // if (token) {
  //   try {
  //     const loggedInUser = await jwtVerify(token.value, keyAsUint8Array, {
  //       algorithms: ["HS256"],
  //     });
  //     const loggedInUserId =
  //       typeof loggedInUser.payload.userId === "string"
  //         ? loggedInUser.payload.userId
  //         : undefined;
  //     req.loggedInUserId = loggedInUserId;
  //   } catch (error) {
  //     console.error("JWT verification failed:", error);
  //   }
  // } else {
  //   console.log("Token not found");
  // }
}
