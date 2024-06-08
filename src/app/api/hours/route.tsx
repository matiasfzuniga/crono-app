import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import { startOfMonth, endOfMonth } from "date-fns";
import {timeToSeconds, secondsToHours} from '@/lib/utils'

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
     if (!session || !session.user || !session.user.email) {
        return NextResponse.error();
  }
    const userEmail = session.user.email;
  if (req.method !== 'GET') {
    return NextResponse.error();
  }

  const { searchParams } = new URL(req.url);

    const yearParam = searchParams.get("y");
    const monthParam = searchParams.get("m");

  if (!yearParam || !monthParam) {
    return  NextResponse.error();
  }

  try {
    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();
    const month = monthParam
      ? parseInt(monthParam, 10)
      : new Date().getMonth() + 1;
    if (month < 1 || month > 12) {
      throw new Error("El mes proporcionado no es válido.");
    }

    const startOfCurrentMonth = startOfMonth(new Date(year, month - 1, 1));
    const endOfCurrentMonth = endOfMonth(new Date(year, month - 1, 1));

    const workdays = await prisma.workday.findMany({
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

    const totalTimeInSecondsThisMonth = workdays.reduce(
      (total, workday) => {
        return total + timeToSeconds(workday.time);
      },
      0
    );

    const totalHours = secondsToHours(
      totalTimeInSecondsThisMonth
    );

        return NextResponse.json({ totalHours });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}