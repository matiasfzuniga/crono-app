"use client";
import React from "react";
import TagUpdate from "@/components/tagUpdate";

const TagDetail = ({ params,id }: any) => {
  return (
    <div className="flex items-center flex-col h-[350px] w-[350px]">
      {params.length !== 0 ? (
        <TagUpdate params={params} id={id}/>
      ) : (
        <TagUpdate params={[]} id={id}/>
      )}
    </div>
  );
};

export default TagDetail;
