import { prisma } from "@/lib/prisma"

export async function getMonthlyHours(userEmail: string, year: number, month: number): Promise<number> {
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const workdays = await prisma.workday.findMany({
    where: {
      userAuthor: {
        email: userEmail,
      },
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    select: {
      time: true,
    },
  });

  const totalHours = workdays.reduce((sum, workday) => sum + parseFloat(workday.time), 0);
  return totalHours;
}