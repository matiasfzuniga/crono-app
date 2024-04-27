import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const data = await req.json()
        console.log(data)
        return NextResponse.json("registering");
    }
    catch(error){
        console.error("Error al procesar la solicitud POST:", error);
        return NextResponse.error();
    }
}