import { Jornada, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Jornada[]> {
  // Fetch data from your API here.
    const response = await fetch("http://localhost:3000/api/jornada", {
    method: 'GET', 
    headers:{
      'Content-Type': 'application/json',
     }
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
