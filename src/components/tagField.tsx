import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface iTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
}

export const TagField = ({ tags, addTag, removeTag, maxTags }: iTag) => {

  const [userInput, setUserInput] = useState<string>(" ");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput(""); 
      }
    }
  };

  return (
    <div className="flex flex-col w-[250px]">
        <span className="pb-2">{ tags.length < maxTags
            ? "Agrega un tag"
            : `solo puedes agregar ${maxTags} tags`}</span>
      <Input
        name="keyword_tags"
        minLength={3}
        maxLength={15}
        type="text"
        className="w-56 border border-gray-300 rounded-md py-2 focus-visible:ring-offset-0 focus-visible:ring-0 bg-[#FFBD83] border-none"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-3 py-2 rounded-lg text-sm shadow-sm font-medium bg-[#FFBD83] text-gray-800 mr-2"
          >
            {tag}
            <button
              className="ml-2 hover:text-gray-100"
              onClick={() => removeTag(tag)}
              title={`Remove${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};