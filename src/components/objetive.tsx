import React from "react";
import { motion, useAnimation } from "framer-motion";
import { FlameKindling,Check,ShieldCheck  } from "lucide-react";
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
  const obj = useStore((state) => state.obj);
  const { hour } = useTimeStore();

  return (
    <div>
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.button animate={controls} onClick={handleButtonClick}>
          <Card className="bg-gray-900 shadow-lg border border-gray-800 p-1 m-4 h-60 w-12 flex justify-around items-center flex-col gap-10">
            <span
              className={`${
                parseInt(obj) == hour
                  ? "border-[#2e8b2e] text-[#2e8b2e]"
                  : parseInt(obj) > hour
                  ? "border-[#FF7800] text-[#FF7800]"
                  : "border-[#81D4FA] text-[#81D4FA]"
              } border p-1 rounded-full h-8 w-8 text-center text-md`}
            >
              {obj}
            </span>
            {showDynamicComponent ? (
              <span className="[writing-mode:vertical-lr] font-semibold invisible">
                objetivo
              </span>
            ) : (
              <span className={`text-xs font-semibold ${
                parseInt(obj) == hour
                  ? "text-[#2e8b2eb0]"
                  : parseInt(obj) > hour
                  ? "text-[#ff77009a]"
                  : "text-[#81d4fa83]"
              } `}>
                G <br/>
                O <br/>
                A <br/>
                L <br/>
                S <br/>
              </span>
            )}
            {
              parseInt(obj) == hour
              ? <Check width={20} height={20} color="#2e8b2e"/>
              : parseInt(obj) > hour
              ? <FlameKindling width={20} height={20} color="#FF7800"/>
              : <ShieldCheck width={20} height={20} color="#81D4FA" />
            }
            
          </Card>
        </motion.button>
      </motion.section>

      {showDynamicComponent && (
        <motion.section
          className="flex gap-4 pl-8 text-center text-gray-200"
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
