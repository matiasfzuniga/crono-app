import React from "react";
import { headers } from "next/headers";
import TagDetail from "@/components/tagDetail";

async function getData(params: { id: string }) {
  const response = await fetch(
    `http://localhost:3000/api/workday/${params.id}`,
    {
      method: "GET",
      headers: headers(),
    }
  );
  if (!response.ok) {
    throw new Error("Hubo un problema al enviar los datos.");
  }
  let datos = await response.json();
  return datos;
}

export default async function WorkDayPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params);
  const toDo = data.todos[0].items;

  const tags = data.tags.map((tag: { id: number; name: string }) => tag.name);

  return (
    <div className="flex justify-center items-center flex-col lg:p-10 pt-5 h-[73vh]">
      <h1 className="text-[40px] text-gray-200">{data.title}</h1>
      <div className="flex justify-between text-gray-400">
        <div className="flex items-center flex-col h-[350px] w-[350px] p-4">
          <div className="flex items-start gap-10">
            <div className="flex justify-center flex-col">
              <h1 className="text-xl font-semibold underline underline-offset-2 text-gray-200">
                día
              </h1>
              <p>{data.day}</p>
            </div>
            <div className="flex items-start justify-center flex-col">
              <h1 className="text-xl font-semibold underline underline-offset-2 text-gray-200">
                tiempo
              </h1>
              <p>{data.time}</p>
            </div>
          </div>
          <h1 className="text-xl font-semibold pt-8 underline underline-offset-2 text-gray-200">
            descripción
          </h1>
          <p>{data.description}</p>
        </div>
        <div className="flex flex-col pt-4 justify-center items-center">
          <h1 className="text-xl font-semibold pb-4 underline underline-offset-2 text-gray-200">
            tags
          </h1>
          <TagDetail params={tags} id={params.id} />
        </div>
        <div className="flex flex-col pt-4 justify-center items-center">

          {toDo.map((item: string, index: number) => (
            <h1
              key={index}
              className="text-xl font-semibold pb-4 text-gray-200"
            >
              {item}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}
