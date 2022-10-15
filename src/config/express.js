import express from "express";
import morgan from "morgan";
import cors from "cors";

import routes from "../routes";

const port = process.env.PORT || 8000;

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
routes(app);

export default async () => {
  app.listen(port, () => {
    console.log(`Express Running, Port: ${port}`);
  });

  return app;
};
