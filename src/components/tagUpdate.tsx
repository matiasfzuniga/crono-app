"use client";
import React from "react";
import useTagInput from "@/hooks/useTag";
import { TagField } from "./tagField";
import { Button } from "@/components/ui/button";

const TagUpdate = ({ params, id }: any) => {
  const { tags, handleAddTag, handleRemoveTag } = useTagInput(5, params);

  const handleSend = async () => {
    try {
      const data = {
        id: parseInt(id),
        tags: tags,
      };
      const response = await fetch(`http://localhost:3000/api/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Hubo un problema al enviar los datos.");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar los datos a la API:", error);
    }
  };

  return (
    <form
      className="flex flex-col h-[250px] justify-between items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <TagField
        tags={tags}
        addTag={handleAddTag}
        removeTag={handleRemoveTag}
        maxTags={5}
      />
      {JSON.stringify(params) !== JSON.stringify(tags) ? (
        <Button
          className={`m-4 mr-10 mb-8 bg-slate-700 hover:bg-[#4c4b96]`}
          onClick={handleSend}
        >
          guardar
        </Button>
      ) : (
        ""
      )}
    </form>
  );
};

export default TagUpdate;
