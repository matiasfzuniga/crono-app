import type { Metadata } from "next";
import {Viga } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import Header from "@/components/header";
import { getServerSession } from "next-auth";

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
    <html lang="en" suppressHydrationWarning className="bg-black m-4">
      <body className={`${inter.className} bg-[#FF7800] rounded-lg`}>  
        <NextAuthProvider>
            <Header session={session}/>
            {children}
          </NextAuthProvider>
        
      </body>
    </html>
  );
}
