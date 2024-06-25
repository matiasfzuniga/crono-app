import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomColor } from "@/lib/utils";

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
     
  export async function POST (req:NextRequest){
    
    const body = await req.json();
    const { id,tags } = body;
    try{

      const existingTags = await prisma.tag.findMany({
        where: {
          name: {
            in: tags,
          },
        },
      });
  
      const existingTagNames = existingTags.map(tag => tag.name);
  
      const newTags = tags.filter((tag:string) => !existingTagNames.includes(tag));
  
      const tagOperations = [
        ...newTags.map((tag:string) => prisma.tag.create({
          data: {
            name: tag,
            color: randomColor()
          },
        })),
      ];
  
      const createdTags = await prisma.$transaction(tagOperations);
  
      const allTags = [
        ...existingTags,
        ...createdTags,
      ];
  
      const updatedWorkday = await prisma.workday.update({
        where: { id: id },
        data: {
          tags: {
            set: allTags.map(tag => ({ id: tag.id })),
          },
        },
        include: {
          tags: true,
        },
      });
      
      return NextResponse.json(updatedWorkday);
    }catch(error){
      console.error("Error al procesar la solicitud POST:", error);
      return NextResponse.error();
    }
  }

  