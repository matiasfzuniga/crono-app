import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req:NextResponse, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
  const { color, userId } = await req.json();

  try {
    const existingTagColor = await prisma.tagColor.findUnique({
      where: {
        userId_tagId: {
          userId,
          tagId: id,
        },
      },
    });

    if (existingTagColor) {
      const updatedTagColor = await prisma.tagColor.update({
        where: {
          userId_tagId: {
            userId,
            tagId: id,
          },
        },
        data: { color },
      });
      return NextResponse.json(updatedTagColor);
    } else {
      const newTagColor = await prisma.tagColor.create({
        data: {
          color,
          userId,
          tagId: id,
        },
      });
      return NextResponse.json(newTagColor);
    }
  } catch (error) {
    console.error("Error al procesar la solicitud PUT:", error);
    return NextResponse.error()
  }
}