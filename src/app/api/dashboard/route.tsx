import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { startOfMonth, endOfMonth } from "date-fns";

function timeToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}
function secondsToHours(seconds: number): number {
  return seconds / 3600;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.error();
  }
  try {
    const { searchParams } = new URL(req.url);

    const yearParam = searchParams.get("y");
    const monthParam = searchParams.get("m");

    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

    const month = monthParam
      ? parseInt(monthParam, 10)
      : new Date().getMonth() + 1;
    if (month < 1 || month > 12) {
      throw new Error("El mes proporcionado no es válido.");
    }

    const startOfCurrentMonth = startOfMonth(new Date(year, month - 1, 1));
    const endOfCurrentMonth = endOfMonth(new Date(year, month - 1, 1));

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
            time: true,
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

    const workdaysThisMonth = await prisma.workday.findMany({
      where: {
        userAuthor: {
          email: userEmail,
        },
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
      select: {
        time: true,
      },
    });

    const statusWorkday = await prisma.workday.findMany({
      where: {
        userAuthor: {
          email: userEmail,
        },
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
      select: {
        status: true,
      },
    });

    const totalTimeInSecondsThisMonth = workdaysThisMonth.reduce(
      (total, workday) => {
        return total + timeToSeconds(workday.time);
      },
      0
    );

    const totalTimeInHoursThisMonth = secondsToHours(
      totalTimeInSecondsThisMonth
    );

    return NextResponse.json({ tagCountMap, totalTimeInHoursThisMonth,statusWorkday });
  } catch (error) {
    console.error("Error al procesar la solicitud GET:", error);
    return NextResponse.error();
  }
}
