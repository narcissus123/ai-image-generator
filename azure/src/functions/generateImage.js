const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");

const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.accountName;

const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    // Get the prompt form user (image desc).
    const { prompt } = await request.json();

    console.log(`Prompt is ${prompt}`);

    // request image creation with target size.
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    // Get the url.
    image_url = response.data.data[0].url;

    // Download the image and return it as a arraybuffer
    const res = await axios.get(image_url, { responseType: "arraybuffer" });
    const arrayBuffer = res.data;

    // Get the token (valid for 30 min) by calling generateSASToken helper method.
    sasToken = await generateSASToken();

    // Get access to our Blob service account.
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    // Get access to the container inside Blob service.
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // A name pattern for image that we are going to store (includes: current timestamp)
    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;

    // Get access to Blob containing our images.
    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    // Upload the image to Blob.
    try {
      await blockBlobClient.uploadData(arrayBuffer);
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }

    return { body: "Successfully Uploaded Image" };
  },
});
