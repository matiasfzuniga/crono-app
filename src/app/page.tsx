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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";



const IndexPage: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


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
    const milisec = timeInSeconds / 1000
    const hours = Math.floor(milisec / 3600);
    const minutes = Math.floor((milisec % 3600) / 60);
    const seconds = Math.floor(milisec % 60);
    const formatNumber = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };
  
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSend = async () => {
    try {
      const currentDate = new Date().toLocaleDateString("en-GB")
      const data = {
        day: currentDate,
        title,
        description,
        time: formatTime(elapsedTime)
      };
      const response = await fetch('api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Hubo un problema al enviar los datos.');
      }
  
      console.log('Datos enviados correctamente a la API.');
    }
    catch (error) {
      console.error('Error al enviar los datos a la API:', error);
    }
    
  }

  return (
    <div className="flex justify-center items-center lg:p-10 pt-16">
      <AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>Cronómetro</CardTitle>
          <CardDescription>     
           contador de horas 
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          <p>Tiempo transcurrido:</p>
          <h1 className="text-3xl font-bold w-full text-center">{formatTime(elapsedTime)}</h1>          
        </CardContent>    
        <CardFooter className="flex flex-col">
          <div className="p-2">
          <Button onClick={handleStartStop} className="m-2">
            {isRunning ? "Pausar" : "Iniciar"}
          </Button>
          <Button onClick={handleReset} className="m-2" variant="outline">Reiniciar</Button>
          </div>
          <AlertDialogTrigger asChild>
          <Button onClick={() => isRunning ? setIsRunning(false) : ""} className="w-[79%]">
            Guardar
          </Button>
          </AlertDialogTrigger>
        </CardFooter>
      </Card>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Guardar sesión del día {new Date().toLocaleDateString("en-GB")}</AlertDialogTitle>
          <AlertDialogDescription>
            Agregar titulo
          </AlertDialogDescription>
          <Input value={title} onChange={handleTagChange}></Input>
          <AlertDialogDescription>
            Agregar una descripción
          </AlertDialogDescription>
          <Textarea value={description} onChange={handleDescriptionChange}></Textarea>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSend}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default IndexPage;