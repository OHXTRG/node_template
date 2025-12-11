import express from "express";
import dotenv from "dotenv";
import path from "path";
import { swagger } from "./swagger/swagger.js";
/// middlerwares
import errorHandler from "./src/middlewares/errorHandler.js";
/// Routes
import AuthRoutes from "./src/routes/auth/auth.routes.js";

dotenv.config();

const app = express();

/// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

/// server static files
app.use(
  "uploads",
  express.static(path.resolve(import.meta.dirname, "..", "uploads"))
);
app.use(express.static(path.resolve(import.meta.dirname, "client")));

/// setup swagger
swagger(app);

//// routes
app.use("/api/v1/auth", AuthRoutes);

/// serve client for all get request
app.get("{*client}", (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, "client", "index.html"));
});

/// error handler
app.use(errorHandler);

export default app;
