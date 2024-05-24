import { Workday, columns } from "./columns";
import { DataTable } from "./data-table";
import { headers } from "next/headers"
import { useQuery } from '@tanstack/react-query'

async function getData(): Promise<Workday[]> {
  // Fetch data from your API here.
    const response = await fetch("http://localhost:3000/api/workday", {
    method: 'GET', 
    headers:headers()
    });
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar los datos.");
    }
    let datos = await response.json();
  return datos;
}


export default async function DemoPage() {

  const data = await getData();
  return (
    <div className="container mx-auto h-[73vh]">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
