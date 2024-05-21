"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Zap,FlameKindling, Play, Pause, RotateCcw,  Check } from "lucide-react";
import LoginDrawer from "@/components/loginDrawer";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
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
      };
      const response = await fetch("api/routes", {
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
    <div className="flex justify-center items-center lg:p-10 pt-16 ">
      <AlertDialog>
        <Card className="bg-[#FFBD83] border-none">
          <CardContent className="flex flex-col justify-center items-center pt-10">
            <p>Tiempo transcurrido:</p>
            <h1
              className={`text-3xl font-bold w-full text-center ${orbitron.className}`}
            >
              {formatTime(elapsedTime)}
            </h1>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="p-2">
              <Button onClick={handleStartStop} className="m-2">
                {isRunning ? <Pause width={18} height={18}/> : <Play width={18} height={18}/>}
              </Button>
              <Button
                onClick={handleReset}
                className="m-2 bg-transparent hover:bg-[#FF7800] border-[#FFA14F]"
                variant="outline"
              >
                <RotateCcw width={18} height={18}/>
              </Button>
            </div>
            <AlertDialogTrigger asChild>
              <Button onClick={handleSave} className="w-[79%]">
                Guardar &nbsp;
                < Check width={15} height={15}/>
              </Button>
            </AlertDialogTrigger>
          </CardFooter>
        </Card>
        <Card className="bg-[#FFBD83] border-none p-1 m-4 h-60 w-12 [writing-mode:vertical-lr] flex justify-center items-center">
          <span>Objetivo :</span>&nbsp;
          <span className="text-[#FF7800]">8 horas</span>
        </Card>
        <Card className="bg-transparent border-none l h-52 p-2 [writing-mode:vertical-lr] flex justify-center">
          <FlameKindling width={20} height={20} />
        </Card>
        {session?.user?.name ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Guardar sesión del día {new Date().toLocaleDateString("en-GB")}
              </AlertDialogTitle>
              <AlertDialogDescription>Agregar titulo</AlertDialogDescription>
              <Input value={title} onChange={handleTagChange}></Input>
              <AlertDialogDescription>
                Agregar una descripción
              </AlertDialogDescription>
              <Textarea
                value={description}
                onChange={handleDescriptionChange}
              ></Textarea>
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
