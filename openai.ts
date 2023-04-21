import {Configuration, OpenAIApi} from "openai";

// creating connection to the openai services.
// It is for both Chat GPT and Dall-E.

const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

// Using this object to communicate with openai.
const openai = new OpenAIApi(configuration);

export default openai;