import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { randomColor } from "@/lib/utils";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  try {
    const workday = await prisma.workday.findMany({
      where: {
        userAuthor: { email: session?.user?.email! },
      },
    });
    return NextResponse.json(workday);
  } catch (error) {
    console.error("Error al procesar la solicitud GET:", error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  try {
    const body = await request.json();
    const { day, title, description, time, tags, todos, status } = body;

    const Workday = await prisma.workday.create({
      data: {
        day,
        time,
        title,
        description,
        status,
        userAuthor: {
          connect: {
            email: session?.user?.email!,
          },
        },
        tags: {
          connectOrCreate: tags.map((tag: string) => {
            return {
              where: { name: tag },
              create: { name: tag },
            };
          }),
        },
        todos: {
          create: {items: todos},
        }
      },
    });


    return NextResponse.json(Workday);
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
    return NextResponse.error();
  }
}
