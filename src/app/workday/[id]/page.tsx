import React from "react";
import { headers } from "next/headers";
import TagDetail from "@/components/tagDetail";
import dynamic from "next/dynamic";

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

  const List = dynamic(() => import("@/components/list"), {
    ssr: true,
  });

  return (
    <div className="flex justify-center items-center flex-col lg:p-22 pt-5 h-[73vh]">
      <div className="flex gap-4">
        <div className="text-[30px] text-gray-200 bg-[#e0e0e00c] border border-gray-900 p-4 rounded-lg w-[400px] mb-4">
          <p className="text-gray-400 font-mono text-xs">TITLE</p>
          <p>{data.title}</p>
        </div>
        <div className="flex items-start gap-5">
          <div className="flex justify-center flex-col bg-[#e0e0e00c] border border-gray-900 p-4 rounded-lg w-[130px] h-[95px]">
            <p className="text-gray-400 font-mono text-xs pb-5">DAY</p>
            <p className="text-LG font-semibold text-gray-200">{data.day}</p>
          </div>
          <div className="flex items-start justify-center flex-col bg-[#e0e0e00c] border border-gray-900 p-4 rounded-lg w-[130px] h-[95px]">
            <p className="text-gray-400 font-mono text-xs pb-5">TIME</p>
            <p className="text-LG font-semibold text-gray-200">{data.time}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-gray-400">
        <div className="flex items-center flex-col h-[300px] w-[350px] mr-2">
          <div className="flex items-center justify-start flex-col bg-[#e0e0e00c] border border-gray-900 p-3 rounded-lg max-h-[233px] h-[233px] w-[350px] overflow-hidden">
            <p className="text-gray-400 font-mono text-sm pb-3">DESCRIPTION</p>
            <p className="">{data.description}</p>
          </div>
          <List items={toDo}/>
        </div>
        <div className="flex flex-col pt-4 justify-center items-center bg-[#e0e0e00c] border border-gray-900 rounded-lg h-[300px] w-[330px] ml-2">
          <p className="text-gray-400 font-mono text-sm">TAGS</p>
          <TagDetail params={tags} id={params.id} />
        </div>
      </div>
    </div>
  );
}

