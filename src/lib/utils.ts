import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) {
    if (current === 0) {
      return 0; 
    }
    return 100;
  }
  const change = ((current - previous) / previous) * 100;
  return change;
}

export function timeToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}
export function secondsToHours(seconds: number): number {
  return seconds / 3600;
}

export function calculatePercentage (partial:number,total:number): number {
  return partial * 100 / total
}

