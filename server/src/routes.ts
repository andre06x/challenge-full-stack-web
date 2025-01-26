import { Router } from "express";
import StudentsController from "@src/controllers/students/StudentsController";

const studentsRouter = Router();

studentsRouter.post("/create", async (req, res) => {
  try {
    await StudentsController.createStudents(req, res);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao processar a requisição." });
  }
});

studentsRouter.get("/", async (_, res) => {
  try {
    await StudentsController.findAllStudents(res);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao processar a requisição." });
  }
});

studentsRouter.get("/:ra", async (req, res) => {
  try {
    await StudentsController.getStudent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao processar a requisição." });
  }
});

studentsRouter.put("/:ra", async (req, res) => {
  try {
    await StudentsController.editedStudent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao processar a requisição." });
  }
});

studentsRouter.delete("/:ra", async (req, res) => {
  try {
    await StudentsController.removeStudent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor ao processar a requisição." });
  }
});

export { studentsRouter };
