import type { Metadata } from "next";
import {Viga } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import Header from "@/components/header";
import { getServerSession } from "next-auth";

// temporario

import { CalendarClock, SquareUser, Home } from 'lucide-react';
import Link from "next/link";

// temporario

const inter =Viga({ subsets: ['latin'], weight:['400'] });

export const metadata: Metadata = {
  title: "Crono app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning className="bg-black">     
      <body className={`${inter.className} bg-black`}> 
      <Header session={session}/>
      <div className="bg-[#FF7800] rounded-lg mx-2">
        <NextAuthProvider>
            {children}
          </NextAuthProvider>
      </div> 
      <div className="bg-[#FF7800] h-[150px] rounded-lg mx-2 my-4 flex justify-center items-center gap-8">
        <Link href={"/"}>
        <Home width={60} height={60}/>      
        </Link>
        <Link href={"/jornada"}>
        <CalendarClock width={60} height={60}/>
        </Link>
        <Link href={"/profile"}>
        <SquareUser width={60} height={60}/>
        </Link>
      </div>    
      </body>
    </html>
  );
}
