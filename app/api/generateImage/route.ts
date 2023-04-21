import { NextResponse } from "next/server";


export async function POST(request: Request) {
    // Getting request from our application and send it to the Azure function and get the resonse.
    const res = await request.json();
    const prompt = res.prompt; 
    
    const response = await fetch("http://127.0.0.1:7071/api/generateImage", {
    method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt})
    });

    const textData = await response.text();
    return NextResponse.json(textData);
  }
  
  