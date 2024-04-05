import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
      const jornada = await prisma.jornada.findMany();
      return NextResponse.json(jornada);
    } catch (error) {
      console.error("Error al procesar la solicitud GET:", error);
      return NextResponse.error();
    }
  }
  
  