export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { middleware } from "@/middleware";
import { useSearchParams } from "next/navigation";
import {
  deleteToken,
  generateToken,
  hashPassword,
  matchedPassword,
  verifyToken,
} from "@/app/backend/utils/globalFunctions";

const db = new PrismaClient();

interface CustomNextRequest extends NextRequest {
  loggedInUserId?: string;
}

export async function POST(req: CustomNextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (query === "register") {
    const body = await req.json();
    const { name, email, organisation, password, phoneNumber } = body;
    const dataToInsert = await db.user.create({
      data: {
        name,
        email,
        organisation,
        password: await hashPassword(password),
        phoneNumber,
      },
    });
    console.log("data to insert : ", dataToInsert);
    return new Response(
      JSON.stringify({ message: "user created", user: dataToInsert })
    );
  }

  if (query === "login") {
    const body = await req.json();
    const { email, password } = body;
    const userWithEmail = await db.user.findUnique({ where: { email } });
    if (
      userWithEmail &&
      (await matchedPassword(password, userWithEmail.password))
    ) {
      const jwtToken = await generateToken(res, userWithEmail.id);
      return new Response(
        JSON.stringify({
          message: "login successfull",
          userWithEmail,
        })
      );
    } else {
      return new Response(JSON.stringify({ message: "login unsuccessfull" }));
    }
  }

  if (query === "resetPassword") {
    const body = await req.json();
    const { email, newPassword } = body;
    const userWithEmail = await db.user.findUnique({ where: { email } });

    // sandgrid nodemailer
  }

  if (query === "logout") {
    await deleteToken();
    return new Response(
      JSON.stringify({ message: "you are successfully logged OUT.." })
    );
  }
}

export async function GET(req: CustomNextRequest, res: NextResponse) {
  return new Response(JSON.stringify({ user: "application working.." }));
}
