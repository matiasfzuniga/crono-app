import type { Metadata } from "next";
import {Viga } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import Header from "@/components/header";
import { getServerSession } from "next-auth";
import Footer from "@/components/footer";

const inter = Viga({ subsets: ['latin'], weight:['400'] });

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
      <div className="bg-[#070013] rounded-lg mx-2">
        <NextAuthProvider>
   
            {children}
    
        </NextAuthProvider>
      </div> 
     <Footer/>  
      </body>
    </html>
  );
}
