import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.error();
      }   
      try {
        const userEmail = session.user.email;

        const userTags = await prisma.tag.findMany({
          where: {
            workdays: {
              some: {
                userAuthor: {
                  email: userEmail,
                },
              },
            },
          },
          select: {
            id: true,
            name: true,
            workdays: {
              select: {
                id: true,
              },
            },
          },
        });
        
        const tagCountMap = userTags.reduce((acc, tag) => {
          if (tag.name) {
            if (!acc[tag.name]) {
              acc[tag.name] = 0;
            }
            acc[tag.name] += tag.workdays.length;
          }
          return acc;
        }, {} as { [key: string]: number });
    
        return NextResponse.json(tagCountMap);
      } catch (error) {
        console.error("Error al procesar la solicitud GET:", error);
        return NextResponse.error();
      }
  }
