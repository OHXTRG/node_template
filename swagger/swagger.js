import swaggerJSDoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";

export const swagger = (app) => {
  const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "My API Docs",
        version: "1.0.0",
        description: "API documentation for my Node.js app",
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Local server",
        },
      ],
    },

    // Path to the API docs (your route files)
    apis: ["./src/routes/**/*.js"],
  };

  const swaggerspec = swaggerJSDoc(options);

  app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerspec));
};
