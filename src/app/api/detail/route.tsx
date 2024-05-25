import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
    const id = await req.json()
    try {
        const data = await prisma.workday.findUnique({
            where: {id:id}
        })
        return data  

    } catch (error) {
      console.error("Error al procesar la solicitud GET:", error);
      return NextResponse.error();
    }
  }
  
  
  
