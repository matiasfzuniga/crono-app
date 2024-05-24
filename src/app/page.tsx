"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { Play, Pause, RotateCcw, Check } from "lucide-react";
import LoginDrawer from "@/components/loginDrawer";
import { Quantico } from "next/font/google";
import Objetive from "@/components/objetive";
import InputTag from "@/components/inputTag";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/store/tagStore";


const quantico = Quantico({
  weight: "700",
  subsets: ["latin"],
});

const IndexPage: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [openDrawer, setOpenDrawer] = useState("");
  const [description, setDescription] = useState("");
  const { data: session } = useSession();
  const tags = useStore(state => state.tag)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - (startTime || Date.now()));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const formatTime = (timeInSeconds: number): string => {
    const milisec = timeInSeconds / 1000;
    const hours = Math.floor(milisec / 3600);
    const minutes = Math.floor((milisec % 3600) / 60);
    const seconds = Math.floor(milisec % 60);
    const formatNumber = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSend = async () => {
    try {
      const currentDate = new Date().toLocaleDateString("en-GB");
      const data = {
        day: currentDate,
        title,
        description,
        time: formatTime(elapsedTime),
        tags:tags,
      };
      const response = await fetch("api/workday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Hubo un problema al enviar los datos.");
      }
    } catch (error) {
      console.error("Error al enviar los datos a la API:", error);
    }
  };

  const handleSave = () => {
    setOpenDrawer("true");
    return isRunning ? setIsRunning(false) : "";
  };

  return (
    <div className="flex justify-center items-center lg:p-10 pt-16 h-[73vh]">
      <AlertDialog>
        <InputTag />
        <Card className="bg-[#FFBD83] border-none shadow-lg">
          <CardContent className="flex flex-col justify-center items-center pt-10">
            <p className="font-semibold">Tiempo transcurrido:</p>
            <h1
              className={`text-[45px] font-bold w-full text-center ${quantico.className}`}
            >
              {formatTime(elapsedTime)}
            </h1>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="p-2">
              <Button
                size={"icon"}
                onClick={handleStartStop}
                className="m-2 rounded-full"
              >
                {isRunning ? (
                  <Pause width={18} height={18} />
                ) : (
                  <Play width={18} height={18} />
                )}
              </Button>
              <Button
                onClick={handleReset}
                className="m-2 bg-transparent rounded-full hover:bg-[#FF7800] border-[#FF7800]"
                size={"icon"}
                variant="outline"
              >
                <RotateCcw width={18} height={18} />
              </Button>
            </div>
            <AlertDialogTrigger asChild>
              <Button
                onClick={handleSave}
                className="w-[100px] rounded-full"
                size={"icon"}
              >
                <Check width={15} height={15} />
              </Button>
            </AlertDialogTrigger>
          </CardFooter>
        </Card>
        <Objetive />
        {session?.user?.name ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Guardar sesión del día {new Date().toLocaleDateString("en-GB")}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-800">Agregar titulo</AlertDialogDescription>
              <Input value={title} onChange={handleTagChange} />
              <AlertDialogDescription className="text-gray-800">
                Agregar una descripción
              </AlertDialogDescription>
              <Textarea
                value={description}
                onChange={handleDescriptionChange}
              ></Textarea>
              { tags.length != 0 ? <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={true}/>
              <label
                htmlFor="terms"
                className="text-sm text-gray-800 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Agregar tags
              </label>
              </div> : ''}
              
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSend}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <LoginDrawer openDrawer={openDrawer} />
        )}
      </AlertDialog>
    </div>
  );
};

export default IndexPage;
