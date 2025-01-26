import express, { Application } from "express";
import { studentsRouter } from "@src/routes";
import cors from "cors";

const app: Application = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use("/students", studentsRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;
