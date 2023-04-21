const { app } = require("@azure/functions");
const generateSASToken = require("../../lib/generateSASToken");

// Creating a new azure function
app.http("generateSASToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    sasToken = await generateSASToken();

    return { body: sasToken };
  },
});
