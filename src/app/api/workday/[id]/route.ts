import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
    try {
        const data = await prisma.workday.findUnique({
            where: {id:id},
            include: {
              tags: true
           }
        })
        return NextResponse.json(data)   
    } catch (error) {
      console.error("Error al procesar la solicitud GET:", error);
      return NextResponse.error();
    }
  }

  
