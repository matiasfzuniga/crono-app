import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  try {
    const body = await request.json();
    const { day, title, description, time } = body;

    const nuevaJornada = await prisma.jornada.create({
      data: {
        day,
        time,
        title,
        description,
        userAuthor:{connect: {
          email: session?.user?.email!
        }},
      },
    });

    return NextResponse.json(nuevaJornada);
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
    return NextResponse.error();
  }
}
