'use client'
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTagInput from "@/hooks/useTag";
import { TagField } from "./tagField";
import { useTagStore } from "@/store/tagStore";

const InputTag = () => {
  const controls = useAnimation();
  const [showDynamicComponent, setShowDynamicComponent] = React.useState(false);
  const { tags, handleAddTag, handleRemoveTag } = useTagInput(5,[]);
  const updateTag = useTagStore((state) => state.updateTag);

  const handleButtonClick = async () => {
    setShowDynamicComponent(!showDynamicComponent);
    await controls.start({
      x: showDynamicComponent ? 0 : -250,
    });
  };
  useEffect(() => {
    updateTag(tags);
  }, [tags, updateTag]);

  return (
    <div>
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.button animate={controls} onClick={handleButtonClick}>
          <Card className="bg-[#FFBD83] shadow-lg border-none p-1 m-4 h-60 w-12 flex justify-around items-center flex-col gap-10">
            {showDynamicComponent ? <ChevronRight /> : <ChevronLeft />}
          </Card>
        </motion.button>
      </motion.section>
      {showDynamicComponent && (
        <motion.section
          className="flex justify-center items-center"
          initial={{ y: -180, x: -162, opacity: 0, position: "absolute" }}
          animate={{ y: -240, opacity: 1 }}
        >
          <form>
            <TagField
              tags={tags}
              addTag={handleAddTag}
              removeTag={handleRemoveTag}
              maxTags={5}
            />
          </form>
        </motion.section>
      )}
    </div>
  );
};

export default InputTag;
