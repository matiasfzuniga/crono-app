import useTodoStore from "@/store/todoStore";
import React, { FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AddToDoForm = () => {
  const [text, setText] = React.useState("");
  const addTodo = useTodoStore((state) => state.addTodo);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-between p-2">
      <Input
        className="w-72 border flex-1 text-gray-200 border-gray-300 rounded-md py-2 focus-visible:ring-offset-0 focus-visible:ring-0 bg-[#1a1c27] border-none"
        minLength={1}
        maxLength={40}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    
    </form>
  );
};

export default AddToDoForm;
