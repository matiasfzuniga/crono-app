"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Play, Pause, RotateCcw, Check } from "lucide-react";
import { Quantico } from "next/font/google";
import Objetive from "@/components/objetive";
import InputTag from "@/components/inputTag";
import { Checkbox } from "@/components/ui/checkbox";
import { useTagStore } from "@/store/tagStore";
import { useStore } from "@/store/objetiveStore";
import { useTimeStore } from "@/store/timeStore";
import useTodoStore from "@/store/todoStore";
import ToDoList from "@/components/toDoList";

const quantico = Quantico({
  weight: "700",
  subsets: ["latin"],
});


const IndexPage: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const tags = useTagStore((state) => state.tag);
  const { hour, setHour } = useTimeStore();
  const obj = useStore((state) => state.obj);
  const todoStore = useTodoStore((state) => state.todos);
  const todos = todoStore.filter((item:any) => item.completed).map((item:any) => item.text)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - (startTime || Date.now()));
      }, 1000);
    }
    setHour(Math.floor(elapsedTime / 3600000));
    return () => clearInterval(interval);
  }, [isRunning, startTime, elapsedTime, setHour]);

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

  const statusObjetive = (obj: number, time: number) => {
    if (obj === time) return "complete";
    if (obj > time) return "incomplete";
    return "exceeded";
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
        tags: tags,
        todos: todos,
        status: statusObjetive(parseInt(obj), hour),
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
    return isRunning ? setIsRunning(false) : "";
  };

  return (
    <div className="flex justify-center items-center lg:p-10 pt-16 h-[73vh]">
      <AlertDialog>
        <InputTag />
        <div className="border-4 border-gray-900 rounded-xl">
          <Card
            className={`${
              parseInt(obj) == hour
                ? "bg-gray-900 border border-[#2e8b2e]"
                : parseInt(obj) > hour
                ? "bg-gray-900 border border-[#ffae44]"
                : "bg-gray-900 border border-[#008B8B]"
            }  shadow-lg`}
          >
            <CardContent className="flex flex-col justify-center items-center pt-10 text-gray-300">
              <p className="font-semibold">Tiempo transcurrido:</p>
              <h1
                className={`text-[45px] w-full text-center ${
                  quantico.className
                } ${
                  parseInt(obj) == hour
                    ? "text-[#2e8b2e]"
                    : parseInt(obj) > hour
                    ? "text-[#ffae44]"
                    : "text-[#008B8B]"
                }`}
              >
                {formatTime(elapsedTime)}
              </h1>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="p-2">
                <Button
                  size={"icon"}
                  onClick={handleStartStop}
                  className="m-2 rounded-full bg-gray-800 hover:bg-slate-800"
                >
                  {isRunning ? (
                    <Pause
                      width={18}
                      height={18}
                      color={`${
                        parseInt(obj) == hour
                          ? "#A5D6A7"
                          : parseInt(obj) > hour
                          ? "#FF7800"
                          : "#81D4FA"
                      }`}
                    />
                  ) : (
                    <Play
                      width={18}
                      height={18}
                      color={`${
                        parseInt(obj) == hour
                          ? "#A5D6A7"
                          : parseInt(obj) > hour
                          ? "#FF7800"
                          : "#81D4FA"
                      }`}
                    />
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  className={`m-2 bg-transparent rounded-full ${
                    parseInt(obj) == hour
                      ? "border-[#A5D6A7] text-[#A5D6A7] hover:bg-[#A5D6A7]"
                      : parseInt(obj) > hour
                      ? "border-[#FF7800] text-[#FF7800] hover:bg-[#ff5e00]"
                      : "border-[#81D4FA] text-[#81D4FA] hover:bg-[#81d4fa70]"
                  }`}
                  size={"icon"}
                  variant="outline"
                >
                  <RotateCcw width={18} height={18} />
                </Button>
              </div>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={handleSave}
                  className={`w-[100px] rounded-full bg-gray-800 hover:bg-slate-800`}
                  size={"icon"}
                >
                  <Check
                    width={15}
                    height={15}
                    color={`${
                      parseInt(obj) == hour
                        ? "#A5D6A7"
                        : parseInt(obj) > hour
                        ? "#FF7800"
                        : "#81D4FA"
                    }`}
                  />
                </Button>
              </AlertDialogTrigger>
            </CardFooter>
          </Card>
        </div>
        <Objetive />

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Guardar sesión del día {new Date().toLocaleDateString("en-GB")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-800">
              Agregar titulo
            </AlertDialogDescription>
            <Input
              value={title}
              minLength={2}
              maxLength={20}
              onChange={handleTagChange}
            />
            <AlertDialogDescription className="text-gray-800">
              Agregar una descripción
            </AlertDialogDescription>
            <Textarea
              value={description}
              onChange={handleDescriptionChange}
              maxLength={300}
            ></Textarea>
            {tags?.length !== 0 ? (
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={true} />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-800 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Agregar tags
                </label>
              </div>
            ) : (
              ""
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ToDoList />
    </div>
  );
};

export default IndexPage;
