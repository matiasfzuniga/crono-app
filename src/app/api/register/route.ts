import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}


// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { SHA256 as sha256 } from "crypto-js";
// import { Prisma } from "@prisma/client";

// export const hashPassword = (string : any) => {
//   return sha256(string).toString();
// };
// export async function POST(req:NextRequest) {
//   let errors = [];
//   const body = await req.json();
//   const { name, email, password } = body;
//   if (!name || !email || !password) {
//     errors.push("invalid inputs");
//     return NextResponse.json({ status: 400, errors });
//   }
//   try {
//     const user = await prisma.user.create({
//       data: { ...body, password: hashPassword(body.password) },
//     });
//     return NextResponse.json({ user });
//   } catch (e) {
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       if (e.code === "P2002") {
//         return NextResponse.json({ message: e.message });
//       }
//       return NextResponse.json({ message: e.message });
//     }
//   }
// }
