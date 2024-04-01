import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const jornada = await prisma.jornada.findMany();
  return NextResponse.json(jornada);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { day, title, description, time } = body;

    const nuevaJornada = await prisma.jornada.create({
      data: {
        day,
        time,
        title,
        description,
      },
    });

    return NextResponse.json(nuevaJornada);
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
    return NextResponse.error();
  }
}
