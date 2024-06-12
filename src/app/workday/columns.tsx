"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Workday = {
  day: string
  time: string
  description: string
  title: string
}
 
export const columns: ColumnDef<Workday>[] = [
  {
    accessorKey: "title",
    header: "título",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "descripción",
    cell: ({ row }) => (
      <div className="w-48">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">{row.getValue("description")}</div>
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-[#171722] hover:text-gray-300"
        >
          Tiempo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "day",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
           className="hover:bg-[#171722] hover:text-gray-300"
        >
          Día
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]