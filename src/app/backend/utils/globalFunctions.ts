import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const generateToken = async (res: NextResponse, userId: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const encoder = new TextEncoder();
  const keyAsUint8Array = encoder.encode(secretKey);

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(keyAsUint8Array);

  cookies().set("jwt_auth", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

interface CustomNextRequest extends NextRequest {
  loggedInUserId?: string;
}

const verifyToken = async (req: CustomNextRequest, res: NextResponse) => {
  const token = req.cookies.get("jwt_auth");
  const secretKey = process.env.JWT_SECRET_KEY;
  const encoder = new TextEncoder();
  const keyAsUint8Array = encoder.encode(secretKey);

  if (token) {
    try {
      const loggedInUser = await jwtVerify(token.value, keyAsUint8Array, {
        algorithms: ["HS256"],
      });

      const loggedInUserId =
        typeof loggedInUser.payload.userId === "string"
          ? loggedInUser.payload.userId
          : undefined;
      req.loggedInUserId = loggedInUserId;
    } catch (error) {
      console.error("JWT verification failed:", error);
    }
  } else {
    console.log("Token not found");
  }
};

const deleteToken = async () => {
  await cookies().delete("jwt_auth");
};

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function matchedPassword(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isCredentialsTrue = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  return isCredentialsTrue;
}

export {
  hashPassword,
  matchedPassword,
  generateToken,
  verifyToken,
  deleteToken,
};
