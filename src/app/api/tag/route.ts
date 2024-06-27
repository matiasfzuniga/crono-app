import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomColor } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.error();
    }
    const userEmail = session.user.email;
    try {
        const tags = await prisma.tag.findMany({
          where: {
            tagColors: {
              some: {
                user: {
                  email: userEmail,
                },
              },
            },
          },
          select: {
            id: true,
            name: true,
            tagColors: {
              select: {
                id: true,
                color: true,
              },
            },
          },
        });
        console.log(tags)
        const userTags = tags.map(tag => ({
          id: tag.id,
          name: tag.name,
          color: tag.tagColors.length > 0 ? tag.tagColors[0].color : randomColor() ,
        }));
    
        return NextResponse.json(userTags)
      } catch (error) {
        console.error("Error al procesar la solicitud GET:", error);
        return NextResponse.error();
      }
}
