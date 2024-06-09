import React from "react";
import { motion, useAnimation } from "framer-motion";
import { FlameKindling } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useStore } from "@/store/objetiveStore";
import { useTimeStore } from "@/store/timeStore";

const Objetive = () => {
  const controls = useAnimation();
  const [showDynamicComponent, setShowDynamicComponent] = React.useState(false);

  const handleButtonClick = async () => {
    setShowDynamicComponent(!showDynamicComponent);
    await controls.start({
      x: showDynamicComponent ? 0 : 170,
    });
  };
  const obj = useStore((state) => state.obj)
  const { hour } = useTimeStore()

  return (
    <div>
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.button animate={controls} onClick={handleButtonClick}>
          <Card className="bg-[#FFBD83] shadow-lg border-none p-1 m-4 h-60 w-12 flex justify-around items-center flex-col gap-10">
            <span className={`${parseInt(obj) == hour && parseInt(obj) != 0 ? 'border-[#A5D6A7] text-[#A5D6A7]'  : parseInt(obj) > hour ? 'border-[#FF7800] text-[#FF7800]' : 'border-[#81D4FA] text-[#81D4FA]'} border p-1 rounded-full h-8 w-8 text-center text-md`}>
              {obj}
            </span>
            {showDynamicComponent ? (
              <span className="[writing-mode:vertical-lr] font-semibold invisible">
              objetivo
            </span>
            ) : (
              <span className="[writing-mode:vertical-lr] font-semibold">
                objetivo
              </span>
            )}

            <FlameKindling width={20} height={20} />
          </Card>
        </motion.button>
      </motion.section>

      {showDynamicComponent && (
        <motion.section
          className="flex gap-4 pl-8 text-center"
          initial={{ y: -100, x: 0, opacity: 0, position: "absolute" }}
          animate={{ y: -160, opacity: 1 }}
        >
          <span>
            {" "}
            El objetivo de hoy <br /> son {obj} horas
          </span>
        </motion.section>
      )}
    </div>
  );
};

export default Objetive;
