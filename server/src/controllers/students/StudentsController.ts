import { Request, Response } from "express";
import StudentsService from "@src/services/student/StudentsService";

interface StudentParam {
  ra: string;
}

interface StudentDataEdit {
  name: string;
  email: string;
}

interface StudentData {
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

class StudentsController {
  async createStudents(req: Request<any, any, StudentData>, res: Response) {
    let student = await StudentsService.createStudent(req);
    return res.status(student.status).json(student);
  }

  async findAllStudents(res: Response) {
    let students = await StudentsService.findAllStudents();
    return res.status(students.status).json(students);
  }

  async editedStudent(req: Request<StudentParam, any, StudentDataEdit>, res: Response) {
    let student = await StudentsService.editStudent(req);
    return res.status(student.status).json(student);
  }

  async removeStudent(req: Request<StudentParam, any, any>, res: Response) {
    let student = await StudentsService.removeStudent(req);
    return res.status(student.status).json(student);
  }

  async getStudent(req: Request<StudentParam, any, any>, res: Response) {
    let student = await StudentsService.getStudent(req);
    return res.status(student.status).json(student);
  }
}

export default new StudentsController();
