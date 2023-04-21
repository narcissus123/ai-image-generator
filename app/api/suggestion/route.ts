export async function GET(request: Request) {

    //Everytime we send the requet, we want to get a new suggestion. 
    // Connect to Microsoft Azure function endpoint
    const response = await fetch("http://127.0.0.1:7071/api/getChatGPTSuggestion", {cache: "no-store"});

   
    const textData = await response.text();

    return new Response(JSON.stringify(textData.trim()), {status: 200});
  }
  
  // Generating suggestions
  