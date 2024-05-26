"use client";
import React from "react";
import TagUpdate from "@/components/tagUpdate";

const TagDetail = ({ params,id }: any) => {
  let tagArray = params.tags.map(
    (tag: { id: number; name: string }) => tag.name
  );

  return (
    <div className="flex items-center flex-col h-[350px] w-[350px]">
      {params.tags.length !== 0 ? (
        <TagUpdate params={tagArray} id={id}/>
      ) : (
        <TagUpdate params={[]} id={id}/>
      )}
    </div>
  );
};

export default TagDetail;
