import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";

export async function GET(req:NextRequest,res:NextResponse) {
  const session = await getServerSession(authOptions);
  try {
    const jornada = await prisma.jornada.findMany({
        where: {
          userAuthor: { email: session?.user?.email! },
        },
      });
      return NextResponse.json(jornada);
    } catch (error) {
      console.error("Error al procesar la solicitud GET:", error);
      return NextResponse.error();
    }
  }
  
  